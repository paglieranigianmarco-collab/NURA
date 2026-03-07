/**
 * NURA — Wellness Quiz
 * Multi-step quiz with personalized recommendations
 */
document.addEventListener('DOMContentLoaded', () => {
    // ─── Quiz Data ──────────────────────────────────────────
    const QUESTIONS = [
        {
            id: 'goal',
            title: 'Qual è il tuo obiettivo principale di benessere?',
            desc: 'Scegli quello che ti sta più a cuore in questo momento.',
            multi: false,
            grid: true,
            options: [
                { value: 'energy', icon: 'ph-lightning', label: 'Più Energia', sub: 'Vitalità e performance' },
                { value: 'sleep', icon: 'ph-moon-stars', label: 'Dormire Meglio', sub: 'Qualità del sonno' },
                { value: 'gut', icon: 'ph-leaf', label: 'Salute Intestinale', sub: 'Digestione e microbioma' },
                { value: 'focus', icon: 'ph-brain', label: 'Focus Mentale', sub: 'Concentrazione e memoria' },
                { value: 'longevity', icon: 'ph-heart', label: 'Longevità', sub: 'Invecchiamento sano' },
                { value: 'fitness', icon: 'ph-barbell', label: 'Recupero Fitness', sub: 'Performance atletica' }
            ]
        },
        {
            id: 'lifestyle',
            title: 'Come descriveresti il tuo stile di vita?',
            desc: 'Questo ci aiuta a calibrare le raccomandazioni.',
            multi: false,
            grid: false,
            options: [
                { value: 'sedentary', icon: 'ph-desktop', label: 'Sedentario', sub: 'Lavoro d\'ufficio, poco movimento' },
                { value: 'moderate', icon: 'ph-person-simple-walk', label: 'Moderatamente Attivo', sub: 'Camminate, sport 2-3x/settimana' },
                { value: 'active', icon: 'ph-person-simple-run', label: 'Molto Attivo', sub: 'Sport intenso 4-5x/settimana' },
                { value: 'athlete', icon: 'ph-trophy', label: 'Atleta', sub: 'Allenamento quotidiano intenso' }
            ]
        },
        {
            id: 'diet',
            title: 'Qual è la tua alimentazione?',
            desc: 'Alcuni integratori sono più indicati in base alla dieta.',
            multi: false,
            grid: true,
            options: [
                { value: 'omnivore', icon: 'ph-fork-knife', label: 'Onnivora', sub: 'Mangio tutto' },
                { value: 'vegetarian', icon: 'ph-plant', label: 'Vegetariana', sub: 'Niente carne' },
                { value: 'vegan', icon: 'ph-leaf', label: 'Vegana', sub: 'Niente prodotti animali' },
                { value: 'keto', icon: 'ph-egg', label: 'Keto/Low-Carb', sub: 'Alto contenuto di grassi' }
            ]
        },
        {
            id: 'sleep_quality',
            title: 'Come valuti la qualità del tuo sonno?',
            desc: 'Il sonno è fondamentale per ogni aspetto del benessere.',
            multi: false,
            grid: false,
            options: [
                { value: 'great', icon: 'ph-smiley', label: 'Eccellente', sub: 'Dormo 7-9h senza problemi' },
                { value: 'okay', icon: 'ph-smiley-meh', label: 'Nella media', sub: 'Qualche volta mi sveglio stanco' },
                { value: 'poor', icon: 'ph-smiley-sad', label: 'Scarsa', sub: 'Fatico ad addormentarmi o mi sveglio spesso' },
                { value: 'terrible', icon: 'ph-smiley-x-eyes', label: 'Pessima', sub: 'Insonnia cronica' }
            ]
        },
        {
            id: 'stress',
            title: 'Quanto stress sperimenti nella vita quotidiana?',
            desc: 'Lo stress influenza molte funzioni corporee.',
            multi: false,
            grid: true,
            options: [
                { value: 'low', icon: 'ph-sun', label: 'Basso', sub: 'Vita tranquilla' },
                { value: 'moderate', icon: 'ph-cloud-sun', label: 'Moderato', sub: 'Gestibile' },
                { value: 'high', icon: 'ph-cloud-rain', label: 'Alto', sub: 'Spesso sotto pressione' },
                { value: 'extreme', icon: 'ph-cloud-lightning', label: 'Molto Alto', sub: 'Costantemente stressato' }
            ]
        }
    ];

    const RECOMMENDATIONS = {
        energy: {
            title: 'Protocollo Energia',
            icon: 'ph-lightning',
            color: 'var(--color-energy)',
            desc: 'CoQ10, Vitamina B12, Ferro e Magnesio per sostenere la produzione di energia cellulare e combattere la stanchezza.',
            tag: 'Energia', tagColor: '#f59e0b'
        },
        sleep: {
            title: 'Deep Rest Formula',
            icon: 'ph-moon-stars',
            color: 'var(--color-sleep)',
            desc: 'Melatonina, Magnesio Glicinato, L-Teanina e Ashwagandha per un sonno profondo e ristoratore.',
            tag: 'Sonno', tagColor: '#6366f1'
        },
        gut: {
            title: 'Gut Repair Complex',
            icon: 'ph-leaf',
            color: 'var(--color-gut)',
            desc: 'Probiotici multi-ceppo, L-Glutammina, zinco e fibre prebiotiche per ripristinare l\'equilibrio del microbioma.',
            tag: 'Gut Health', tagColor: '#10b981'
        },
        focus: {
            title: 'Neuro Protocol',
            icon: 'ph-brain',
            color: 'var(--color-brain)',
            desc: 'Lion\'s Mane, Omega-3 DHA, Bacopa Monnieri e Fosfatidilserina per supportare concentrazione e memoria.',
            tag: 'Focus', tagColor: '#8b5cf6'
        },
        longevity: {
            title: 'Longevity Stack',
            icon: 'ph-heart',
            color: 'var(--color-longevity)',
            desc: 'NMN, Resveratrolo, Vitamina D3+K2 e Astaxantina per proteggere le cellule dall\'invecchiamento.',
            tag: 'Longevità', tagColor: '#059669'
        },
        fitness: {
            title: 'Recovery Pro',
            icon: 'ph-barbell',
            color: 'var(--color-fitness)',
            desc: 'Creatina, Proteine del siero, BCAA e Curcumina per accelerare il recupero e ridurre l\'infiammazione.',
            tag: 'Fitness', tagColor: '#ef4444'
        },
        stress: {
            title: 'Calm & Adapt',
            icon: 'ph-flower-lotus',
            color: '#a78bfa',
            desc: 'Ashwagandha KSM-66, Rhodiola Rosea, Magnesio e complesso vitaminico B per gestire lo stress.',
            tag: 'Anti-Stress', tagColor: '#a78bfa'
        },
        vitamin: {
            title: 'Daily Essential',
            icon: 'ph-pill',
            color: 'var(--color-energy)',
            desc: 'Multi-vitaminico completo con Vitamina D3, K2, Zinco e Selenio per colmare le carenze di base.',
            tag: 'Base', tagColor: '#6b7280'
        }
    };

    // ─── State ──────────────────────────────────────────────
    let currentStep = 0;
    const answers = {};

    // ─── DOM ────────────────────────────────────────────────
    const introSection = document.getElementById('quizIntro');
    const quizContainer = document.getElementById('quizContainer');
    const resultsSection = document.getElementById('quizResults');
    const questionArea = document.getElementById('questionArea');
    const stepLabel = document.getElementById('stepLabel');
    const progressFill = document.getElementById('quizProgressFill');
    const prevBtn = document.getElementById('prevQuestion');
    const nextBtn = document.getElementById('nextQuestion');
    const startBtn = document.getElementById('startQuizBtn');
    const retakeBtn = document.getElementById('retakeQuiz');

    // ─── Start Quiz ─────────────────────────────────────────
    startBtn.addEventListener('click', () => {
        introSection.style.display = 'none';
        quizContainer.style.display = 'flex';
        renderQuestion();
    });

    retakeBtn.addEventListener('click', () => {
        currentStep = 0;
        Object.keys(answers).forEach(k => delete answers[k]);
        resultsSection.style.display = 'none';
        introSection.style.display = 'flex';
    });

    // ─── Render Question ────────────────────────────────────
    function renderQuestion() {
        const q = QUESTIONS[currentStep];
        const pct = ((currentStep + 1) / QUESTIONS.length) * 100;

        progressFill.style.width = pct + '%';
        stepLabel.textContent = `Domanda ${currentStep + 1} di ${QUESTIONS.length}`;
        prevBtn.style.visibility = currentStep === 0 ? 'hidden' : 'visible';

        if (currentStep === QUESTIONS.length - 1) {
            nextBtn.innerHTML = 'Vedi Risultati <i class="ph ph-sparkle" style="display:inline"></i>';
        } else {
            nextBtn.innerHTML = 'Avanti <i class="ph ph-arrow-right" style="display:inline"></i>';
        }

        const selected = answers[q.id] || null;
        nextBtn.disabled = !selected;

        questionArea.innerHTML = `
            <h2>${q.title}</h2>
            <p class="quiz-desc">${q.desc}</p>
            <div class="quiz-options ${q.grid ? 'grid-2' : ''}">
                ${q.options.map(opt => `
                    <div class="quiz-option ${selected === opt.value ? 'selected' : ''}" data-value="${opt.value}">
                        <div class="quiz-option-icon"><i class="ph ${opt.icon}"></i></div>
                        <div class="quiz-option-text">
                            ${opt.label}
                            ${opt.sub ? `<small>${opt.sub}</small>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Attach click handlers
        questionArea.querySelectorAll('.quiz-option').forEach(opt => {
            opt.addEventListener('click', () => {
                answers[q.id] = opt.dataset.value;
                questionArea.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
                opt.classList.add('selected');
                nextBtn.disabled = false;
            });
        });
    }

    // ─── Navigation ─────────────────────────────────────────
    nextBtn.addEventListener('click', () => {
        if (currentStep < QUESTIONS.length - 1) {
            currentStep++;
            renderQuestion();
        } else {
            showResults();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            renderQuestion();
        }
    });

    // ─── Show Results ───────────────────────────────────────
    function showResults() {
        quizContainer.style.display = 'none';
        resultsSection.style.display = 'block';

        const recs = getRecommendations();
        const grid = document.getElementById('resultsGrid');

        grid.innerHTML = recs.map(rec => `
            <div class="result-card">
                <div class="result-card-icon" style="background: ${rec.color};">
                    <i class="ph ${rec.icon}"></i>
                </div>
                <h3>${rec.title}</h3>
                <p>${rec.desc}</p>
                <span class="result-tag" style="background: ${rec.tagColor}15; color: ${rec.tagColor};">${rec.tag}</span>
            </div>
        `).join('');
    }

    function getRecommendations() {
        const recs = [];

        // Primary recommendation based on goal
        const goal = answers.goal || 'energy';
        if (RECOMMENDATIONS[goal]) recs.push(RECOMMENDATIONS[goal]);

        // Sleep recommendation if sleep is poor
        const sleepQ = answers.sleep_quality;
        if ((sleepQ === 'poor' || sleepQ === 'terrible') && goal !== 'sleep') {
            recs.push(RECOMMENDATIONS.sleep);
        }

        // Stress recommendation if stress is high
        const stress = answers.stress;
        if ((stress === 'high' || stress === 'extreme')) {
            recs.push(RECOMMENDATIONS.stress);
        }

        // Vitamin base for sedentary or vegan
        if (answers.lifestyle === 'sedentary' || answers.diet === 'vegan') {
            recs.push(RECOMMENDATIONS.vitamin);
        }

        // Gut health for everyone with poor sleep + stress
        if (sleepQ === 'terrible' && stress === 'extreme' && goal !== 'gut') {
            recs.push(RECOMMENDATIONS.gut);
        }

        // Ensure at least 2 recommendations and max 4
        if (recs.length < 2) recs.push(RECOMMENDATIONS.vitamin);
        return recs.slice(0, 4);
    }

    // ─── Header scroll ──────────────────────────────────────
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
});
