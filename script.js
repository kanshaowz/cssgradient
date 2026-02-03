const translations = {
    en: {
        title: "CSSGradient",
        previewText: "CSS Gradient",
        linear: "Linear",
        radial: "Radial",
        angle: "Angle",
        remove: "×",
        addColor: "+ Add Color Stop",
        presets: "Presets",
        cssCode: "CSS Code",
        copy: "Copy",
        copied: "Copied to clipboard!",
        footer: "Made with 💜 by CSSGradient"
    },
    zh: {
        title: "CSS渐变",
        previewText: "CSS 渐变",
        linear: "线性",
        radial: "径向",
        angle: "角度",
        remove: "×",
        addColor: "+ 添加色标",
        presets: "预设",
        cssCode: "CSS 代码",
        copy: "复制",
        copied: "已复制到剪贴板！",
        footer: "用 💜 制作 - CSSGradient"
    },
    es: {
        title: "CSSGradient",
        previewText: "Gradiente CSS",
        linear: "Lineal",
        radial: "Radial",
        angle: "Ángulo",
        remove: "×",
        addColor: "+ Añadir Color",
        presets: "Preajustes",
        cssCode: "Código CSS",
        copy: "Copiar",
        copied: "¡Copiado al portapapeles!",
        footer: "Hecho con 💜 por CSSGradient"
    },
    ja: {
        title: "CSSGradient",
        previewText: "CSS グラデーション",
        linear: "線形",
        radial: "円形",
        angle: "角度",
        remove: "×",
        addColor: "+ カラーを追加",
        presets: "プリセット",
        cssCode: "CSS コード",
        copy: "コピー",
        copied: "クリップボードにコピーしました！",
        footer: "💜 で作られました - CSSGradient"
    },
    ko: {
        title: "CSSGradient",
        previewText: "CSS 그라데이션",
        linear: "선형",
        radial: "원형",
        angle: "각도",
        remove: "×",
        addColor: "+ 색상 추가",
        presets: "프리셋",
        cssCode: "CSS 코드",
        copy: "복사",
        copied: "클립보드에 복사됨!",
        footer: "💜 로 제작됨 - CSSGradient"
    }
};

const presets = [
    { name: "Purple Dream", colors: ["#667eea", "#764ba2"], type: "linear", angle: 90 },
    { name: "Sunset", colors: ["#f093fb", "#f5576c"], type: "linear", angle: 120 },
    { name: "Ocean", colors: ["#4facfe", "#00f2fe"], type: "linear", angle: 90 },
    { name: "Forest", colors: ["#43e97b", "#38f9d7"], type: "linear", angle: 135 },
    { name: "Golden", colors: ["#fa709a", "#fee140"], type: "linear", angle: 90 },
    { name: "Night", colors: ["#30cfd0", "#330867"], type: "linear", angle: 135 },
    { name: "Berry", colors: ["#a8edea", "#fed6e3"], type: "linear", angle: 90 },
    { name: "Citrus", colors: ["#ffecd2", "#fcb69f"], type: "linear", angle: 135 },
    { name: "Aurora", colors: ["#667eea", "#764ba2", "#f093fb"], type: "linear", angle: 135 },
    { name: "Rainbow", colors: ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#9400d3"], type: "linear", angle: 90 },
    { name: "Midnight", colors: ["#0f0c29", "#302b63", "#24243e"], type: "linear", angle: 135 },
    { name: "Peach", colors: ["#ffecd2", "#fcb69f"], type: "radial", angle: 0 }
];

let currentLang = 'en';
let gradientType = 'linear';
let gradientAngle = 90;
let colorStops = [
    { color: '#667eea', position: 0 },
    { color: '#764ba2', position: 100 }
];

function updateTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });
}

function generateGradient() {
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    const stopsString = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ');
    
    let gradientCSS;
    if (gradientType === 'linear') {
        gradientCSS = `linear-gradient(${gradientAngle}deg, ${stopsString})`;
    } else {
        gradientCSS = `radial-gradient(circle, ${stopsString})`;
    }
    
    document.getElementById('gradientPreview').style.background = gradientCSS;
    document.getElementById('cssCode').textContent = `background: ${gradientCSS};`;
    
    return gradientCSS;
}

function renderColorStops() {
    const container = document.getElementById('colorStops');
    container.innerHTML = '';
    
    colorStops.forEach((stop, index) => {
        const div = document.createElement('div');
        div.className = 'color-stop';
        div.innerHTML = `
            <input type="color" class="color-picker" value="${stop.color}" data-index="${index}">
            <input type="number" class="position-input" value="${stop.position}" min="0" max="100" data-index="${index}">
            <span>%</span>
            <button class="remove-stop" data-index="${index}">×</button>
        `;
        container.appendChild(div);
    });
    
    container.querySelectorAll('.color-picker').forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.dataset.index);
            colorStops[index].color = e.target.value;
            generateGradient();
        });
    });
    
    container.querySelectorAll('.position-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.dataset.index);
            colorStops[index].position = parseInt(e.target.value) || 0;
            generateGradient();
        });
    });
    
    container.querySelectorAll('.remove-stop').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (colorStops.length > 2) {
                const index = parseInt(e.target.dataset.index);
                colorStops.splice(index, 1);
                renderColorStops();
                generateGradient();
            }
        });
    });
}

function renderPresets() {
    const grid = document.getElementById('presetGrid');
    grid.innerHTML = '';
    
    presets.forEach((preset, index) => {
        const div = document.createElement('div');
        div.className = 'preset-item';
        div.title = preset.name;
        
        const stops = preset.colors.map((c, i) => {
            const pos = i === 0 ? 0 : i === preset.colors.length - 1 ? 100 : (i / (preset.colors.length - 1) * 100);
            return `${c} ${pos}%`;
        }).join(', ');
        
        if (preset.type === 'linear') {
            div.style.background = `linear-gradient(${preset.angle}deg, ${stops})`;
        } else {
            div.style.background = `radial-gradient(circle, ${stops})`;
        }
        
        div.addEventListener('click', () => {
            gradientType = preset.type;
            gradientAngle = preset.angle;
            colorStops = preset.colors.map((c, i) => ({
                color: c,
                position: i === 0 ? 0 : i === preset.colors.length - 1 ? 100 : Math.round(i / (preset.colors.length - 1) * 100)
            }));
            
            document.querySelectorAll('.type-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.type === gradientType);
            });
            
            document.getElementById('angleSlider').value = gradientAngle;
            document.getElementById('angleValue').value = gradientAngle;
            document.getElementById('angleControl').style.display = gradientType === 'linear' ? 'block' : 'none';
            
            renderColorStops();
            generateGradient();
        });
        
        grid.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderColorStops();
    renderPresets();
    generateGradient();
    
    document.getElementById('langSelect').addEventListener('change', (e) => {
        currentLang = e.target.value;
        updateTranslations();
    });
    
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            gradientType = btn.dataset.type;
            document.getElementById('angleControl').style.display = gradientType === 'linear' ? 'block' : 'none';
            generateGradient();
        });
    });
    
    document.getElementById('angleSlider').addEventListener('input', (e) => {
        gradientAngle = parseInt(e.target.value);
        document.getElementById('angleValue').value = gradientAngle;
        generateGradient();
    });
    
    document.getElementById('angleValue').addEventListener('input', (e) => {
        gradientAngle = parseInt(e.target.value) || 0;
        document.getElementById('angleSlider').value = gradientAngle;
        generateGradient();
    });
    
    document.getElementById('addStopBtn').addEventListener('click', () => {
        const newPosition = Math.round(100 / (colorStops.length));
        const midColor = colorStops[Math.floor(colorStops.length / 2)]?.color || '#667eea';
        colorStops.push({ color: midColor, position: newPosition });
        colorStops.sort((a, b) => a.position - b.position);
        renderColorStops();
        generateGradient();
    });
    
    document.getElementById('copyBtn').addEventListener('click', () => {
        const code = document.getElementById('cssCode').textContent;
        navigator.clipboard.writeText(code).then(() => {
            const btn = document.getElementById('copyBtn');
            const originalText = btn.textContent;
            btn.textContent = translations[currentLang].copied;
            btn.classList.add('copied');
            
            const toast = document.getElementById('toast');
            toast.textContent = translations[currentLang].copied;
            toast.classList.add('show');
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove('copied');
                toast.classList.remove('show');
            }, 2000);
        });
    });
});
