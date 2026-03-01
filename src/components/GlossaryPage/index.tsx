import React, {useState, useMemo, useEffect} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import glossaryData from '@site/static/glossary.json';
import styles from './styles.module.css';

interface GlossaryTerm {
  term_en: string;
  term_es: string;
  category: string;
  phase: string[];
  definition_en: string;
  definition_es: string;
  context_en: string;
  context_es: string;
  related_terms: string[];
  canonical: boolean;
  acronym_full: string | null;
}

const CATEGORIES = [
  {key: 'All', label_en: 'All', label_es: 'Todos'},
  {key: 'Global', label_en: 'Global', label_es: 'Global'},
  {key: 'Methodology', label_en: 'Methodology', label_es: 'Metodología'},
  {key: 'Framework', label_en: 'Framework', label_es: 'Framework'},
  {key: 'Anti-pattern', label_en: 'Anti-patterns', label_es: 'Anti-patrones'},
  {key: 'AI Technical', label_en: 'AI Technical', label_es: 'IA Técnico'},
];

export default function GlossaryPage(): React.ReactElement {
  const {i18n} = useDocusaurusContext();
  const isEs = i18n.currentLocale === 'es';

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  const terms: GlossaryTerm[] = glossaryData.terms;

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return terms
      .filter((t) => {
        if (activeCategory !== 'All' && t.category !== activeCategory) return false;
        if (!q) return true;
        const haystack = [
          t.term_en,
          t.term_es,
          isEs ? t.definition_es : t.definition_en,
          isEs ? t.context_es : t.context_en,
          t.acronym_full ?? '',
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(q);
      })
      .sort((a, b) => {
        const termA = isEs ? a.term_es : a.term_en;
        const termB = isEs ? b.term_es : b.term_en;
        return termA.localeCompare(termB);
      });
  }, [terms, search, activeCategory, isEs]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const scrollToTerm = (termEn: string) => {
    setSearch(termEn);
    setActiveCategory('All');
    setCurrentPage(1);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  // On mount: if URL has a hash, find the term, go to its page, scroll to it
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    const slug = decodeURIComponent(hash);
    // All terms sorted alphabetically (same as filtered with no search/category)
    const allSorted = [...terms].sort((a, b) => {
      const tA = isEs ? a.term_es : a.term_en;
      const tB = isEs ? b.term_es : b.term_en;
      return tA.localeCompare(tB);
    });

    const idx = allSorted.findIndex(
      (t) => t.term_en.toLowerCase().replace(/\s+/g, '-') === slug,
    );
    if (idx === -1) return;

    const page = Math.floor(idx / PAGE_SIZE) + 1;
    setActiveCategory('All');
    setSearch('');
    setCurrentPage(page);

    // Wait for render, then scroll to the element
    requestAnimationFrame(() => {
      setTimeout(() => {
        const el = document.getElementById(slug);
        if (el) {
          el.scrollIntoView({behavior: 'smooth', block: 'center'});
          el.style.outline = '2px solid var(--ifm-color-primary)';
          el.style.outlineOffset = '4px';
          el.style.borderRadius = '0.5rem';
          setTimeout(() => { el.style.outline = ''; el.style.outlineOffset = ''; }, 2000);
        }
      }, 100);
    });
  }, []);

  return (
    <div className={styles.glossaryContainer}>
      <div className={styles.searchWrapper}>
        <div className={styles.searchRelative}>
          <span className={styles.searchIcon}>&#x1F50D;</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder={isEs ? 'Buscar términos...' : 'Search terms...'}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>

      <div className={styles.categoryTabs}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            className={`${styles.categoryTab} ${activeCategory === cat.key ? styles.categoryTabActive : ''}`}
            onClick={() => { setActiveCategory(cat.key); setCurrentPage(1); }}>
            {isEs ? cat.label_es : cat.label_en}
          </button>
        ))}
      </div>

      <div className={styles.resultsCount}>
        {filtered.length} {isEs ? 'términos' : 'terms'}
        {activeCategory !== 'All' && ` · ${isEs ? CATEGORIES.find((c) => c.key === activeCategory)?.label_es : activeCategory}`}
        {totalPages > 1 && ` · ${isEs ? 'Página' : 'Page'} ${currentPage}/${totalPages}`}
      </div>

      {filtered.length === 0 ? (
        <div className={styles.noResults}>
          {isEs
            ? 'No se encontraron términos. Prueba con otra búsqueda.'
            : 'No terms found. Try a different search.'}
        </div>
      ) : (
        <>
        <div className={styles.termGrid}>
          {paginated.map((t) => {
            const term = isEs ? t.term_es : t.term_en;
            const definition = isEs ? t.definition_es : t.definition_en;
            const context = isEs ? t.context_es : t.context_en;

            return (
              <div key={t.term_en} id={t.term_en.toLowerCase().replace(/\s+/g, '-')} className={styles.termCard}>
                <div className={styles.termHeader}>
                  <h3 className={styles.termName}>{term}</h3>
                  {t.canonical && (
                    <span className={styles.canonicalBadge}>
                      {isEs ? 'Sagrado' : 'Sacred'}
                    </span>
                  )}
                </div>

                {t.acronym_full && (
                  <div className={styles.acronymFull}>{t.acronym_full}</div>
                )}

                <div className={styles.termMeta}>
                  <span className={styles.metaTag}>{t.category}</span>
                  {t.phase.map((p) => (
                    <span key={p} className={styles.metaTag}>{p}</span>
                  ))}
                </div>

                <div className={styles.termDefinition}>{definition}</div>

                {context && (
                  <div className={styles.termContext}>{context}</div>
                )}

                {t.related_terms.length > 0 && (
                  <div className={styles.relatedTerms}>
                    <span className={styles.relatedLabel}>
                      {isEs ? 'Relacionados:' : 'Related:'}
                    </span>
                    {t.related_terms.map((rt) => (
                      <button
                        key={rt}
                        className={styles.relatedTerm}
                        onClick={() => scrollToTerm(rt)}>
                        {isEs
                          ? terms.find((x) => x.term_en === rt)?.term_es ?? rt
                          : rt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <nav className={styles.pagination}>
            <button
              className={styles.paginationBtn}
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}>
              &lsaquo;
            </button>
            {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`${styles.paginationBtn} ${page === currentPage ? styles.paginationBtnActive : ''}`}
                onClick={() => goToPage(page)}>
                {page}
              </button>
            ))}
            <button
              className={styles.paginationBtn}
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}>
              &rsaquo;
            </button>
          </nav>
        )}
        </>
      )}
    </div>
  );
}
