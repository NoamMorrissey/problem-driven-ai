import React, {useState, useMemo} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import faqData from '@site/static/faq.json';
import styles from './styles.module.css';

interface FAQEntry {
  id: string;
  question_en: string;
  question_es: string;
  answer_en: string;
  answer_es: string;
  category: string;
}

const CATEGORIES = [
  {key: 'All', label_en: 'All', label_es: 'Todas'},
  {key: 'General', label_en: 'General', label_es: 'General'},
  {key: 'Phase 1', label_en: 'Phase 1', label_es: 'Fase 1'},
  {key: 'Phase 2', label_en: 'Phase 2', label_es: 'Fase 2'},
  {key: 'Phase 3', label_en: 'Phase 3', label_es: 'Fase 3'},
  {key: 'Phase 4', label_en: 'Phase 4', label_es: 'Fase 4'},
  {key: 'Phase 5', label_en: 'Phase 5', label_es: 'Fase 5'},
];

export default function FAQPage(): React.ReactElement {
  const {i18n} = useDocusaurusContext();
  const isEs = i18n.currentLocale === 'es';

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [openId, setOpenId] = useState<string | null>(null);
  const PAGE_SIZE = 10;

  const faqs: FAQEntry[] = faqData.faqs;

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return faqs.filter((f) => {
      if (activeCategory !== 'All' && f.category !== activeCategory) return false;
      if (!q) return true;
      const haystack = [
        f.question_en,
        f.question_es,
        isEs ? f.answer_es : f.answer_en,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [faqs, search, activeCategory, isEs]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={styles.faqContainer}>
      <div className={styles.searchWrapper}>
        <div className={styles.searchRelative}>
          <span className={styles.searchIcon}>&#x1F50D;</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder={isEs ? 'Buscar preguntas...' : 'Search questions...'}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); setOpenId(null); }}
          />
        </div>
      </div>

      <div className={styles.categoryTabs}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            className={`${styles.categoryTab} ${activeCategory === cat.key ? styles.categoryTabActive : ''}`}
            onClick={() => { setActiveCategory(cat.key); setCurrentPage(1); setOpenId(null); }}>
            {isEs ? cat.label_es : cat.label_en}
          </button>
        ))}
      </div>

      <div className={styles.resultsCount}>
        {filtered.length} {isEs ? 'preguntas' : 'questions'}
        {activeCategory !== 'All' && ` · ${isEs ? CATEGORIES.find((c) => c.key === activeCategory)?.label_es : activeCategory}`}
        {totalPages > 1 && ` · ${isEs ? 'Página' : 'Page'} ${currentPage}/${totalPages}`}
      </div>

      {filtered.length === 0 ? (
        <div className={styles.noResults}>
          {isEs
            ? 'No se encontraron preguntas. Prueba con otra búsqueda.'
            : 'No questions found. Try a different search.'}
        </div>
      ) : (
        <>
        <div className={styles.faqGrid}>
          {paginated.map((f) => {
            const question = isEs ? f.question_es : f.question_en;
            const answer = isEs ? f.answer_es : f.answer_en;
            const isOpen = openId === f.id;

            return (
              <div key={f.id} className={`${styles.faqCard} ${isOpen ? styles.faqCardOpen : ''}`}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => toggleFaq(f.id)}
                  aria-expanded={isOpen}>
                  <span className={styles.questionText}>{question}</span>
                  <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>
                    &#x203A;
                  </span>
                </button>
                {isOpen && (
                  <div className={styles.faqAnswer}>
                    <div className={styles.categoryBadge}>{f.category}</div>
                    <p className={styles.answerText}>{answer}</p>
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
