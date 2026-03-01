import type {Root, Text, Parent, PhrasingContent} from 'mdast';
import glossaryData from '../../static/glossary.json';

interface GlossaryTerm {
  term_en: string;
  term_es: string;
  category: string;
  definition_en: string;
  definition_es: string;
}

const TOOLTIP_CATEGORIES = new Set(['Methodology', 'Framework', 'Anti-pattern']);

const SKIP_TYPES = new Set([
  'heading',
  'link',
  'linkReference',
  'code',
  'inlineCode',
]);

function buildTermMap(): Map<string, GlossaryTerm> {
  const map = new Map<string, GlossaryTerm>();
  for (const t of (glossaryData as {terms: GlossaryTerm[]}).terms) {
    if (!TOOLTIP_CATEGORIES.has(t.category)) continue;
    map.set(t.term_en.toLowerCase(), t);
    if (t.term_es.toLowerCase() !== t.term_en.toLowerCase()) {
      map.set(t.term_es.toLowerCase(), t);
    }
  }
  return map;
}

function buildRegex(termMap: Map<string, GlossaryTerm>): RegExp {
  const keys = Array.from(termMap.keys());
  keys.sort((a, b) => b.length - a.length);
  const escaped = keys.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');
}

// Card components that act as navigation links — never inject tooltips inside them
const SKIP_COMPONENTS = new Set([
  'GlossaryTooltip',
  'PhaseCardList',
  'MethodologyCardList',
  'PrincipleCardList',
  'FilteredDocCardList',
  'GuideCard',
  'GuideCardGrid',
  'StatCard',
  'StatCardGrid',
]);

function shouldSkip(node: {type: string; name?: string}): boolean {
  if (SKIP_TYPES.has(node.type)) return true;
  if (
    (node.type === 'mdxJsxTextElement' || node.type === 'mdxJsxFlowElement') &&
    node.name &&
    SKIP_COMPONENTS.has(node.name)
  )
    return true;
  return false;
}

function processNode(
  node: Parent,
  termMap: Map<string, GlossaryTerm>,
  regex: RegExp,
  matched: Set<string>,
): void {
  if (shouldSkip(node as {type: string; name?: string})) return;

  const newChildren: unknown[] = [];
  let changed = false;

  for (const child of node.children) {
    if (child.type === 'text') {
      const text = (child as Text).value;
      regex.lastIndex = 0;

      const parts: unknown[] = [];
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = regex.exec(text)) !== null) {
        const termKey = match[1].toLowerCase();
        const term = termMap.get(termKey);
        if (!term) continue;

        const canonical = term.term_en;
        if (matched.has(canonical.toLowerCase())) continue;
        matched.add(canonical.toLowerCase());

        if (match.index > lastIndex) {
          parts.push({type: 'text', value: text.slice(lastIndex, match.index)});
        }
        parts.push({
          type: 'mdxJsxTextElement',
          name: 'GlossaryTooltip',
          attributes: [
            {type: 'mdxJsxAttribute', name: 'term', value: canonical},
          ],
          children: [{type: 'text', value: match[0]}],
        });
        lastIndex = match.index + match[0].length;
      }

      if (parts.length > 0) {
        if (lastIndex < text.length) {
          parts.push({type: 'text', value: text.slice(lastIndex)});
        }
        newChildren.push(...parts);
        changed = true;
      } else {
        newChildren.push(child);
      }
    } else {
      if ('children' in child && Array.isArray((child as Parent).children)) {
        processNode(child as Parent, termMap, regex, matched);
      }
      newChildren.push(child);
    }
  }

  if (changed) {
    node.children = newChildren as PhrasingContent[];
  }
}

function remarkGlossary() {
  const termMap = buildTermMap();
  const regex = buildRegex(termMap);

  return (tree: Root) => {
    const matched = new Set<string>();
    processNode(tree as unknown as Parent, termMap, regex, matched);
  };
}

export default remarkGlossary;
