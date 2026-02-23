# Skill: build-phase

## Trigger

- Command `construir fase [N] [name]` where:
  - `[N]` = phase number (1-6)
  - `[name]` = phase name in English (e.g., "AI Build", "Problem Discovery")
- Optional: `--pdf [path]` to specify PDF source. If omitted, asks user for path.

---

## Reference: Established Page Patterns

### Methodology Pages (in `phases/[NN]-[phase-name]/`)

Standard pages (present in every phase):

| sidebar_position | EN sidebar_label | ES sidebar_label | Content focus |
|---|---|---|---|
| 0 | (index) | (index) | Phase overview with DocCardList |
| 1 | "Why this phase" | "Por qué esta fase" | Motivation, consequences of skipping |
| 2 | varies by phase | varies | Core concept definition (what it is/isn't) |
| 3 | varies | varies | Phase-specific content |
| ... | varies | varies | Additional phase-specific pages |
| last-1 | "Who and when" | "Quién y cuándo" | Roles, timing, participation |
| last | "Connection to Phase N+1" | "Conexión con Fase N+1" | Bridge to next phase |

Phase-specific pages are determined by PDF content analysis. Examples:
- Phase 1: "The Trap", "Key Questions", "Biases"
- Phase 2: "Alignment Dynamics", "Solution Brief"
- Phase 3: "Rules", "Agents", "Skills", "Anti-patterns (methodology)"

### Framework Pages (in `framework/phases/[NN]-[phase-name]/`)

Fixed structure — same 6 pages for EVERY phase:

| sidebar_position | EN sidebar_label | ES sidebar_label | Filename |
|---|---|---|---|
| 0 | (index) | (index) | `index.mdx` |
| 1 | "Step by Step" | "Paso a Paso" | `07-step-by-step-process.mdx` |
| 2 | "Anatomy" | "Anatomía" | `08-[topic]-anatomy.mdx` |
| 3 | "Artifacts" | "Artefactos" | `09-artifacts.mdx` |
| 4 | "Gate Review" | "Gate Review" | `10-gate-review.mdx` |
| 5 | "Anti-patterns" | "Anti-patrones" | `11-anti-patterns.mdx` |
| 6 | "Duration" | "Duración" | `12-duration-and-effort.mdx` |

Note: Filenames use numeric prefixes (07-12) to sort in the filesystem.
Docusaurus strips these for the doc ID.

---

## Step-by-Step

### Phase A: Preparation

#### Step 1: Extract PDF Content
- Extract full text from the provided PDF
- If extraction fails (poppler/PyMuPDF not available), use Swift PDFKit:
  compile and run a Swift extraction script
- Store extracted text for analysis

#### Step 2: Content Map
- Identify all sections and subsections in the PDF
- For each section, note: title, page range, key concepts, examples
- Classify each section as:
  - **Conceptual** → methodology candidate
  - **Operational** → framework candidate
  - **Both** → split between methodology (why/what) and framework (how)

#### Step 3: Cross-reference Existing Content
- Check if methodology pages already exist for this phase
  (`docs/phases/[NN]-[phase-name]/`)
- Check if framework pages already exist
  (`docs/framework/phases/[NN]-[phase-name]/`)
- Identify what's already covered vs what needs to be created
- Read previous phases (1, 2, 3) to understand established patterns:
  sidebar labels, content depth, tone, example style

### Phase B: Methodology (conceptual)

#### Step 4: Determine Page List
- Map PDF sections to methodology pages
- Always include standard pages: Why, What is/isn't, Who and when,
  Connection to next phase
- Identify phase-specific pages from unique PDF content
- Present proposed page list to user before generating content

#### Step 5: Generate ES Content
- Write ES content for each page following these guidelines:
  - **Tone**: Simple, didactic, professional. Not academic, not casual.
  - **Examples**: Always use AI-applied examples (not generic software).
    Good: "When a team asks GPT-4 to build an API without defining the
    problem..." Bad: "When a team starts coding without requirements..."
  - **Structure**: Start with the "why", then define, then show implications
  - **Length**: 80-150 lines per page. Enough depth, no padding.
  - **Admonitions**: Use `:::tip`, `:::warning`, `:::danger` for anti-patterns
  - **Sacred terminology**: Never translate protected terms (see orchestrator.md)
- Frontmatter: absolute ES slugs (`/fases/[phase-name]/[page-slug]`)
- Tags: localized ES tags

#### Step 6: Generate EN Content
- Translate each ES page to EN
- Frontmatter: relative EN slugs
- Tags: localized EN tags
- Maintain identical `sidebar_position`

#### Step 7: Infrastructure (Methodology)
- Create `_category_.json` in both trees if not exists
- Create `index.mdx` in both trees with DocCardList
- Add `slugMappings` to `docusaurus.config.ts` for every new page
  where EN slug differs from ES slug

#### Step 7b: Preview Server
- Build and serve for visual review:
  ```
  lsof -ti:3000 | xargs kill -9 2>/dev/null
  npx docusaurus clear && npx docusaurus build
  npx docusaurus serve --port 3000 &
  ```
- Confirm server is running at `http://localhost:3000`
- This allows the human to navigate the content in-browser before approving

#### Step 8: Present for Human Review
- Show all methodology pages to user
- Format: page-by-page, with clear section headers
- Remind user the preview is live at `http://localhost:3000`
- Ask: "¿Apruebas este contenido?"

#### Step 9: Human Review Cycle
- **If APPROVED**:
  - `git add` all new methodology files + config changes
  - `git commit` with descriptive message
  - Continue to Phase C
- **If REJECTED**:
  - User provides specific feedback (which pages, what changes)
  - Iterate on the flagged pages only
  - Re-present modified pages for review
  - Repeat until approved
  - Commit

### Phase C: Framework (operational)

#### Step 10: Generate 6 Framework Pages (ES)
For each of the 6 standard pages:

**Step by Step**: Extract the operational process from the PDF.
Break into numbered steps with clear inputs → activities → outputs.
Include practical examples for technical concepts.

**Anatomy**: Extract the structural elements of the phase.
Include templates (project-context.md, agent definitions, etc.).
Show the relationship between components.

**Artifacts**: List all deliverables. For each: name, who produces it,
who consumes it, when it's created. Include creation sequence diagram.

**Gate Review**: Extract exit criteria. Format as checkmark/cross checklist.
Include the validation question and transition description.

**Anti-patterns**: Extract operational failure patterns (distinct from
methodology anti-patterns). For each: what, how it manifests, why
dangerous, how to detect, how to prevent. Include quick-reference table.

**Duration**: Extract timing guidance. Include complexity scenarios table,
time distribution, under/over-investment signals, team composition.

Content guidelines:
- **Audience**: designers, developers, business, strategy people
- **Language**: Clear, no jargon without explanation
- **Examples**: Practical, cross-discipline (not just code examples)
- **Tables**: Use for structured comparisons
- **Templates**: Include where applicable (escape `{}` as `&#123;` `&#125;` in MDX)

#### Step 11: Generate 6 Framework Pages (EN)
- Same as Step 6 (translate, adjust slugs and tags)

#### Step 12: Infrastructure (Framework)
- Same as Step 7 (category JSON, index, slugMappings)

#### Step 12b: Preview Server
- Same as Step 7b (rebuild and serve for visual review)

#### Step 13: Present for Human Review
- Same as Step 8 (with preview live at `http://localhost:3000`)

#### Step 14: Human Review Cycle
- Same as Step 9 (approve → commit, reject → iterate → commit)

### Phase D: Verification

#### Step 15: Build and Verify
- `npx docusaurus clear && npx docusaurus build`
- Verify 0 new broken links (pre-existing warnings acceptable)
- Verify locale switcher works for all new pages (both directions)
- Report results

---

## Output Format

```
=== CONSTRUIR FASE [N]: [NAME] ===

PDF: [path]
Extracted: [pages] pages, [sections] sections

--- METHODOLOGY ---
Pages to create:
  ES: i18n/es/.../current/phases/[NN]-[name]/[file].mdx
  EN: docs/phases/[NN]-[name]/[file].mdx
Status: [PENDING REVIEW | APPROVED | ITERATING]
Commit: [hash or pending]

--- FRAMEWORK ---
Pages to create:
  ES: i18n/es/.../current/framework/phases/[NN]-[name]/[file].mdx
  EN: docs/framework/phases/[NN]-[name]/[file].mdx
Status: [PENDING REVIEW | APPROVED | ITERATING]
Commit: [hash or pending]

--- VERIFICATION ---
Build: [SUCCESS | FAIL]
Locale switcher: [ALL PASS | issues listed]
```

---

## Validation

- Consults: `rules/core-rules.md` (Rules 1-4, 7, 9)
- Consults: `rules/phase-content-rules.md` (Rules 10-15)
- Invokes agents: Content Curator, Structure Validator, SEO & Metadata
