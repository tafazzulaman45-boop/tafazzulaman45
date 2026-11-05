// ==================================================================
// TAFAZZUL AMAN - DIGITAL MARKETING & PERFORMANCE GROWTH ENGINE
// Master JavaScript: UI Interactions, Analytics Proofs, Ads Showcase
// ==================================================================

// Theme Toggle & Persistence
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const htmlEl = document.documentElement;

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('ta_theme') || 'dark';
if (savedTheme === 'light') {
  htmlEl.classList.remove('dark');
  htmlEl.classList.add('light');
  if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
} else {
  htmlEl.classList.remove('light');
  htmlEl.classList.add('dark');
  if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    if (htmlEl.classList.contains('dark')) {
      htmlEl.classList.remove('dark');
      htmlEl.classList.add('light');
      localStorage.setItem('ta_theme', 'light');
      if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
    } else {
      htmlEl.classList.remove('light');
      htmlEl.classList.add('dark');
      localStorage.setItem('ta_theme', 'dark');
      if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
    }
  });
}

// Mobile Menu Drawer
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileDrawer = document.getElementById('mobileDrawer');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileMenuBtn && mobileDrawer) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileDrawer.classList.toggle('active');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('active');
    });
  });
}

// Sticky Header
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (header) {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// Fullscreen Lightbox Modal (For Zooming Images)
function openLightbox(imgUrl) {
  let modal = document.getElementById('lightboxModal');
  let img = document.getElementById('lightboxImg');
  
  if (!modal) {
    // Dynamically inject if not in DOM
    modal = document.createElement('div');
    modal.id = 'lightboxModal';
    modal.className = 'lightbox-modal';
    modal.innerHTML = `
      <div class="lightbox-backdrop" onclick="closeLightbox()"></div>
      <div class="lightbox-content">
        <button class="lightbox-close-btn" onclick="closeLightbox()" aria-label="Close Lightbox">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <img id="lightboxImg" src="" alt="Enlarged Proof Screenshot" />
      </div>
    `;
    document.body.appendChild(modal);
    img = document.getElementById('lightboxImg');
  }

  if (img) {
    img.src = imgUrl;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Toast Feedback Notification
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

// Copy to Clipboard with Toast
function copyToClipboard(text, msg) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(msg || 'Copied to clipboard!');
  }).catch(() => {
    showToast('Failed to copy');
  });
}

// Interactive Paid Ads Showcase Tab Switcher
function switchAdsTab(tabId) {
  document.querySelectorAll('.ads-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.ads-tab-pane').forEach(pane => pane.classList.remove('active'));

  const targetBtn = document.getElementById(`adsTabBtn-${tabId}`);
  const targetPane = document.getElementById(`adsPane-${tabId}`);

  if (targetBtn) targetBtn.classList.add('active');
  if (targetPane) targetPane.classList.add('active');
}

// Form Submission directly to Tafazzul Aman's Email (tafazzulaman45@gmail.com)
function handleFormSubmit(e) {
  if (e) e.preventDefault();
  const nameEl = document.getElementById('senderName');
  const emailEl = document.getElementById('senderEmail') || document.getElementById('senderContact');
  const phoneEl = document.getElementById('senderPhone');
  const serviceEl = document.getElementById('senderService');
  const msgEl = document.getElementById('senderMsg');
  const submitBtn = document.getElementById('contactSubmitBtn') || (e && e.target ? e.target.querySelector('button[type="submit"]') : null);
  const statusEl = document.getElementById('formStatus');

  const name = nameEl ? nameEl.value.trim() : '';
  const email = emailEl ? emailEl.value.trim() : '';
  const phone = phoneEl ? phoneEl.value.trim() : '';
  const service = serviceEl ? serviceEl.value : 'General Digital Marketing';
  const msg = msgEl ? msgEl.value.trim() : '';

  if (!name || !email || !msg) {
    showToast('Please fill in your Name, Email, and Message!');
    if (statusEl) {
      statusEl.style.display = 'block';
      statusEl.innerHTML = '<span style="color:#ff6b6b;"><i class="fa-solid fa-circle-exclamation"></i> Please fill in your name, email, and message.</span>';
    }
    return;
  }

  // Visual loading state on submit button
  const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';
  }
  if (statusEl) {
    statusEl.style.display = 'block';
    statusEl.innerHTML = '<span style="color:var(--text-muted);"><i class="fa-solid fa-spinner fa-spin"></i> Delivering to tafazzulaman45@gmail.com...</span>';
  }

  // Submit directly to Tafazzul Aman's Gmail via FormSubmit AJAX API
  fetch('https://formsubmit.co/ajax/tafazzulaman45@gmail.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      phone: phone || 'Not provided',
      service: service,
      message: msg,
      _subject: `New Inquiry from ${name} - ${service}`,
      _template: 'table'
    })
  })
  .then(response => response.json())
  .then(data => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }
    const form = document.getElementById('contactForm');
    if (form) form.reset();

    if (statusEl) {
      statusEl.style.display = 'block';
      statusEl.innerHTML = `
        <div style="background:rgba(37,211,102,0.12); border:1px solid #25D366; color:#25D366; padding:12px 16px; border-radius:8px; font-weight:600; text-align:left;">
          <i class="fa-solid fa-circle-check"></i> Thank you, ${name}! Your inquiry has been sent directly to Tafazzul Aman's email (<strong>tafazzulaman45@gmail.com</strong>). You will receive a response shortly.
        </div>
      `;
    }
    showToast('✓ Email sent directly to Tafazzul Aman!');
  })
  .catch(error => {
    console.warn('FormSubmit AJAX fallback to mailto:', error);
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }
    // Fail-safe Mailto Fallback
    const mailtoSubject = encodeURIComponent(`Inquiry from ${name} - ${service}`);
    const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${msg}`);
    window.location.href = `mailto:tafazzulaman45@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    if (statusEl) {
      statusEl.style.display = 'block';
      statusEl.innerHTML = `
        <div style="background:rgba(201,162,39,0.12); border:1px solid var(--accent-gold); color:var(--accent-gold); padding:12px 16px; border-radius:8px; text-align:left;">
          <i class="fa-solid fa-envelope-open-text"></i> Opening your email client to send directly to <strong>tafazzulaman45@gmail.com</strong>.
        </div>
      `;
    }
    showToast('Opening email client for tafazzulaman45@gmail.com');
  });
}

// Dynamic Analytics Proof Data Dictionary (16 Properties with verified PNG proofs)
const proofData = {
  'fxtrusts': {
    title: 'fxtrusts.com Performance Proof',
    url: 'https://fxtrusts.com',
    displayUrl: 'https://fxtrusts.com/',
    metrics: [
      { val: '203K', lbl: 'Total Impressions' },
      { val: '732', lbl: 'Search Clicks' },
      { val: '807+', lbl: 'Active Users (+19.2%)' },
      { val: '16K', lbl: 'Event Interactions' }
    ],
    gscImg: 'fxtrusts_gsc_proof.png',
    gscDesc: '203,000+ organic impressions and 732 high-intent clicks managed by Tafazzul Aman on Google Search Console.',
    ga4Img: 'fxtrusts_ga4_proof.png',
    ga4Desc: '807+ active users with a +19.2% monthly surge, 16K events, and 1.4K engaged sessions on Google Analytics 4.'
  },
  'snakedecompiler': {
    title: 'snakedecompiler.com Performance Proof',
    url: 'https://snakedecompiler.com/',
    displayUrl: 'https://snakedecompiler.com/',
    metrics: [
      { val: '310', lbl: 'Total Impressions' },
      { val: '34', lbl: 'Search Clicks' },
      { val: '11%', lbl: 'High CTR Rate' },
      { val: '17', lbl: 'Average Position' }
    ],
    gscImg: 'snakedecompiler_gsc_proof.png',
    gscDesc: '310 organic search impressions with 34 high-intent clicks, achieving a standout 11% Average CTR and top 17 ranking on Google Search Console.',
    ga4Img: 'snakedecompiler_ga4_proof.png',
    ga4Desc: 'Realtime tracking infrastructure, custom conversion events, and Google Analytics 4 measurement configured by Tafazzul Aman.'
  },
  'yoforex': {
    title: 'yoforex.org Performance Proof',
    url: 'https://yoforex.org/',
    displayUrl: 'https://yoforex.org/',
    metrics: [
      { val: '13K', lbl: 'Total Impressions' },
      { val: '1.68K', lbl: 'Search Clicks' },
      { val: '12.9%', lbl: 'Average CTR' },
      { val: '44', lbl: 'Realtime Active (30m)' }
    ],
    gscImg: 'yoforex_gsc_proof.png',
    gscDesc: '13,000+ organic impressions and 1.68K search clicks managed by Tafazzul Aman on Google Search Console with a 12.9% Average CTR.',
    ga4Img: 'yoforex_ga4_proof.png',
    ga4Desc: '44 active users in the last 30 minutes, 156 event interactions, and Google Analytics 4 tracking infrastructure configured by Tafazzul Aman.'
  },
  'yo4x': {
    title: 'yo4x.com Performance Proof',
    url: 'https://yo4x.com/',
    displayUrl: 'https://yo4x.com/',
    metrics: [
      { val: '247', lbl: 'Total Impressions' },
      { val: '11', lbl: 'Search Clicks' },
      { val: '112', lbl: 'Active Users (+387%)' },
      { val: '840', lbl: 'Event Count (+803%)' }
    ],
    gscImg: 'yo4x_gsc_proof.png',
    gscDesc: '247 organic search impressions with 11 clicks managed by Tafazzul Aman on Google Search Console.',
    ga4Img: 'yo4x_ga4_proof.png',
    ga4Desc: '112 active users (+387.0% surge), 840 event interactions (+803.2%), and 111 new users measured on Google Analytics 4.'
  },
  'emptrakr': {
    title: 'emptrakr.com Performance Proof',
    url: 'https://emptrakr.com/',
    displayUrl: 'https://emptrakr.com/',
    metrics: [
      { val: '19.3K', lbl: 'Total Impressions' },
      { val: '85', lbl: 'Search Clicks' },
      { val: '255', lbl: 'Active Users (+65.6%)' },
      { val: '8.9K', lbl: 'Event Count (+36.4%)' }
    ],
    gscImg: 'emptrakr_gsc_proof.png',
    gscDesc: '19,300+ organic impressions and 85 search clicks tracked on Google Search Console managed by Tafazzul Aman.',
    ga4Img: 'emptrakr_ga4_proof.png',
    ga4Desc: '255 active users (+65.6%), 4.9K pageviews (+20.7%), and 8.9K event interactions measured on Google Analytics 4.'
  },
  'yoforexai': {
    title: 'yoforexai.com Performance Proof',
    url: 'https://yoforexai.com/',
    displayUrl: 'https://yoforexai.com/',
    metrics: [
      { val: '8.76K', lbl: 'Total Impressions' },
      { val: '673', lbl: 'Search Clicks' },
      { val: '347', lbl: 'Active Users (+67.6%)' },
      { val: '2.9K', lbl: 'Event Count (+36.4%)' }
    ],
    gscImg: 'yoforexai_gsc_proof.png',
    gscDesc: '8,760+ organic impressions and 673 search clicks with a 7.7% Average CTR and top 11 ranking managed by Tafazzul Aman on Google Search Console.',
    ga4Img: 'yoforexai_ga4_proof.png',
    ga4Desc: '347 active users (+67.6%), 2.9K event interactions (+36.4%), and 338 new users measured on Google Analytics 4.'
  },
  'flexymarkets': {
    title: 'flexymarkets.com Performance Proof',
    url: 'https://flexymarkets.com/',
    displayUrl: 'https://flexymarkets.com/',
    metrics: [
      { val: '226K', lbl: 'Total Impressions' },
      { val: '1.06K', lbl: 'Search Clicks' },
      { val: '1.9K', lbl: 'Active Users' },
      { val: '7.7K', lbl: 'Event Count' }
    ],
    gscImg: 'flexymarkets_gsc_proof.png',
    gscDesc: '226,000+ organic search impressions and 1.06K clicks managed by Tafazzul Aman on Google Search Console with a 11.5 average ranking position.',
    ga4Img: 'flexymarkets_ga4_proof.png',
    ga4Desc: '1.9K active users, 7.7K event interactions, and 1.8K new user acquisitions measured on Google Analytics 4.'
  },
  'forexfactory': {
    title: 'forexfactory.cc Performance Proof',
    url: 'https://forexfactory.cc/',
    displayUrl: 'https://forexfactory.cc/',
    metrics: [
      { val: '4.78K', lbl: 'Total Impressions' },
      { val: '56', lbl: 'Search Clicks' },
      { val: '9.3K', lbl: 'Active Users (+58.3%)' },
      { val: '36K', lbl: 'Event Count (+83.1%)' }
    ],
    gscImg: 'forexfactory_gsc_proof.png',
    gscDesc: '4,780+ organic search impressions and 56 clicks tracked on Google Search Console managed by Tafazzul Aman.',
    ga4Img: 'forexfactory_ga4_proof.png',
    ga4Desc: '9.3K active users (+58.3%), 36K event interactions (+83.1%), and 9.6K pageviews measured on Google Analytics 4.'
  },
  'fxcracked': {
    title: 'fxcracked.org Performance Proof',
    url: 'https://fxcracked.org/',
    displayUrl: 'https://fxcracked.org/',
    metrics: [
      { val: '130K', lbl: 'Total Impressions' },
      { val: '9.67K', lbl: 'Search Clicks' },
      { val: '7.5%', lbl: 'Average CTR' },
      { val: '2.1K', lbl: 'Active Users (+11.7%)' }
    ],
    gscImg: 'fxcracked_gsc_proof.png',
    gscDesc: '130,000+ organic impressions and 9.67K search clicks with a 7.5% Average CTR and top 15 position managed by Tafazzul Aman on Google Search Console.',
    ga4Img: 'fxcracked_ga4_proof.png',
    ga4Desc: '2.1K active users (+11.7%), 15K event interactions (+10.2%), and 1.8K new users measured on Google Analytics 4.'
  },
  'tradecopier': {
    title: 'tradecopier.org Performance Proof',
    url: 'https://tradecopier.org/',
    displayUrl: 'https://tradecopier.org/',
    metrics: [
      { val: '9.6K', lbl: 'Total Impressions' },
      { val: '132', lbl: 'Search Clicks' },
      { val: '741', lbl: 'Sessions (+330.8%)' },
      { val: '5.8K', lbl: 'Event Count (+344%)' }
    ],
    gscImg: 'tradecopier_gsc_proof.png',
    gscDesc: '9,600+ organic impressions and 132 search clicks tracked on Google Search Console managed by Tafazzul Aman.',
    ga4Img: 'tradecopier_ga4_proof.png',
    ga4Desc: '741 sessions (+330.8%), 102 key event conversions, and 5.8K event interactions measured on Google Analytics 4.'
  },
  'yoforexea': {
    title: 'yoforexea.com Performance Proof',
    url: 'https://yoforexea.com/',
    displayUrl: 'https://yoforexea.com/',
    metrics: [
      { val: '2.47K', lbl: 'Total Impressions' },
      { val: '64', lbl: 'Search Clicks' },
      { val: '2K', lbl: 'Active Users' },
      { val: '8.3K', lbl: 'Event Count' }
    ],
    gscImg: 'yoforexea_gsc_proof.png',
    gscDesc: '2,470+ organic impressions and 64 search clicks with a 2.6% Average CTR managed by Tafazzul Aman on Google Search Console.',
    ga4Img: 'yoforexea_ga4_proof.png',
    ga4Desc: '2K active users, 8.3K event interactions, and 1.9K new user acquisitions measured on Google Analytics 4.'
  },
  'yoforexcoin': {
    title: 'yoforex.co.in Performance Proof',
    url: 'https://yoforex.co.in/',
    displayUrl: 'https://yoforex.co.in/',
    metrics: [
      { val: '5.25K', lbl: 'Total Impressions' },
      { val: '683', lbl: 'Search Clicks' },
      { val: '13%', lbl: 'Average CTR' },
      { val: '1.2K', lbl: 'Active Users (+16%)' }
    ],
    gscImg: 'yoforex_coin_gsc_proof.jpg',
    gscDesc: '5,250+ organic search impressions, 683 search clicks, standout 13% Average CTR, and top 5.3 average ranking on Google Search Console managed by Tafazzul Aman.',
    ga4Img: 'yoforex_coin_ga4_proof.png',
    ga4Desc: '1.2K active users (+16.2%), 7.4K event interactions (+17.7%), and 1.2K new user acquisitions measured on Google Analytics 4 (GA4).'
  },
  'aayaservices': {
    title: 'aayaservices.com Performance Proof',
    url: 'https://aayaservices.com/',
    displayUrl: 'https://aayaservices.com/',
    metrics: [
      { val: '617', lbl: 'Total Impressions' },
      { val: '17', lbl: 'Search Clicks' },
      { val: '7.8', lbl: 'Average Position' },
      { val: '66', lbl: 'Active Users (+12%)' }
    ],
    gscImg: 'aayaservices_gsc_proof.png',
    gscDesc: '617 organic search impressions and 17 search clicks with a top 7.8 average search position on Google Search Console managed by Tafazzul Aman.',
    ga4Img: 'aayaservices_ga4_proof.png',
    ga4Desc: '66 active users (+11.9%), 276 event interactions (+30.2%), and 101 pageviews (+50.7%) measured on Google Analytics 4 (GA4).'
  },
  'yopips': {
    title: 'yopips.com Performance Proof',
    url: 'https://yopips.com/',
    displayUrl: 'https://yopips.com/',
    metrics: [
      { val: '177K', lbl: 'Total Impressions' },
      { val: '42.8K', lbl: 'Search Clicks' },
      { val: '24.2%', lbl: 'Average CTR' },
      { val: '58', lbl: 'Realtime Active (30m)' }
    ],
    gscImg: 'yopips_gsc_proof.png',
    gscDesc: '177,000+ organic impressions and 42.8K search clicks managed by Tafazzul Aman on Google Search Console with an exceptional 24.2% CTR and top 10 average position.',
    ga4Img: 'yopips_ga4_proof.png',
    ga4Desc: '58 active users in the last 30 minutes, 23K sessions, 436 key event conversions, and 104K event interactions measured on Google Analytics 4.'
  },
  'rtx5orrnn': {
    title: 'rtx5.orrnn.com Performance Proof',
    url: 'https://rtx5.orrnn.com/',
    displayUrl: 'https://rtx5.orrnn.com/',
    metrics: [
      { val: '1.45K', lbl: 'Total Impressions' },
      { val: '34', lbl: 'Search Clicks' },
      { val: '112', lbl: 'Active Users (+49.3%)' },
      { val: '1.2K', lbl: 'Event Count (+71.8%)' }
    ],
    gscImg: 'rtx5orrnn_gsc_proof.png',
    gscDesc: '1,450+ organic impressions and 34 search clicks with a 2.4% Average CTR managed by Tafazzul Aman on Google Search Console.',
    ga4Img: 'rtx5orrnn_ga4_proof.png',
    ga4Desc: '112 active users (+49.3%), 1.2K event count (+71.8%), and 594 page views measured on Google Analytics 4.'
  },
  'orrnn': {
    title: 'orrnn.com Performance Proof',
    url: 'https://orrnn.com/',
    displayUrl: 'https://orrnn.com/',
    metrics: [
      { val: '3.16K', lbl: 'Total Impressions' },
      { val: '67', lbl: 'Search Clicks' },
      { val: '54', lbl: 'Active Users' },
      { val: '471', lbl: 'Event Count (+25.3%)' }
    ],
    gscImg: 'orrnn_gsc_proof.png',
    gscDesc: '3,160+ organic impressions and 67 search clicks managed by Tafazzul Aman on Google Search Console with a 23.9 average position.',
    ga4Img: 'orrnn_ga4_proof.png',
    ga4Desc: '54 active users, 471 event interactions (+25.3%), and 50 new users measured on Google Analytics 4.'
  },
  'yoforexnet': {
    title: 'yoforex.net Performance Proof',
    url: 'https://yoforex.net/',
    displayUrl: 'https://yoforex.net/',
    metrics: [
      { val: '3.27K', lbl: 'Total Impressions' },
      { val: '77', lbl: 'Search Clicks' },
      { val: '2.3K', lbl: 'Active Users (+0.6%)' },
      { val: '23K', lbl: 'Event Count (+10.0%)' }
    ],
    gscImg: 'yoforexnet_gsc_proof.png',
    gscDesc: '3,270+ organic impressions and 77 search clicks managed by Tafazzul Aman on Google Search Console with a top 6.8 average position.',
    ga4Img: 'yoforexnet_ga4_proof.png',
    ga4Desc: '2.3K active users (+0.6%), 23K event count (+10.0%), and 1.7K new users measured on Google Analytics 4.'
  }
};

// Analytics Proof Modal Functions (GSC & GA4)
function openProofModal(propertyKey) {
  const modal = document.getElementById('proofModal');
  const key = propertyKey || 'fxtrusts';
  const data = proofData[key] || proofData['fxtrusts'];
  if (!modal || !data) return;

  // Update Header & Links
  const titleEl = document.getElementById('proofModalTitleText');
  const targetUrlEl = document.getElementById('proofTargetUrl');
  const visitBtn = document.getElementById('proofVisitBtn');
  const visitBtnText = document.getElementById('proofVisitBtnText');

  if (titleEl) titleEl.textContent = data.title;
  if (targetUrlEl) targetUrlEl.textContent = data.displayUrl;
  if (visitBtn) visitBtn.href = data.url;
  if (visitBtnText) visitBtnText.textContent = `Visit Live Website (${data.url.replace('https://', '').replace('/', '')})`;

  // Update Metrics
  const metricsContainer = document.getElementById('proofMetricsSummary');
  if (metricsContainer) {
    metricsContainer.innerHTML = data.metrics.map(m => `
      <div class="proof-metric-pill">
        <div class="proof-metric-val">${m.val}</div>
        <div class="proof-metric-lbl">${m.lbl}</div>
      </div>
    `).join('');
  }

  // Update GSC & GA4 contents
  const gscImg = document.getElementById('proofGscImg');
  const gscDesc = document.getElementById('proofGscDesc');
  const ga4Img = document.getElementById('proofGa4Img');
  const ga4Desc = document.getElementById('proofGa4Desc');

  if (gscImg) gscImg.src = data.gscImg;
  if (gscDesc) gscDesc.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-emerald); margin-right: 6px;"></i> <strong>Google Search Console Verification:</strong> ${data.gscDesc}`;
  if (ga4Img) ga4Img.src = data.ga4Img;
  if (ga4Desc) ga4Desc.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-emerald); margin-right: 6px;"></i> <strong>Google Analytics 4 Verification:</strong> ${data.ga4Desc}`;

  switchProofTab('gsc');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProofModal() {
  const modal = document.getElementById('proofModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function switchProofTab(tabId) {
  document.querySelectorAll('.proof-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.proof-tab-content').forEach(content => content.classList.remove('active'));
  
  const activeBtn = document.getElementById(`tabBtn-${tabId}`);
  const activeContent = document.getElementById(`tabContent-${tabId}`);
  if (activeBtn) activeBtn.classList.add('active');
  if (activeContent) activeContent.classList.add('active');
}

// Close Modal / Lightbox on backdrop click
window.addEventListener('click', (e) => {
  const proofModal = document.getElementById('proofModal');
  if (e.target === proofModal) {
    closeProofModal();
  }
  const lightboxModal = document.getElementById('lightboxModal');
  if (lightboxModal && e.target === lightboxModal) {
    closeLightbox();
  }
});

// Close modals on Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProofModal();
    closeLightbox();
  }
});

// FAQ Accordion Handler
function toggleFaq(headerEl) {
  const item = headerEl.parentElement;
  const isActive = item.classList.contains('active');
  
  // Close all open FAQs
  document.querySelectorAll('.faq-item').forEach(el => {
    el.classList.remove('active');
  });

  // Toggle clicked
  if (!isActive) {
    item.classList.add('active');
  }
}

// Blog Category Filter
function filterBlogCategory(category) {
  document.querySelectorAll('.blog-filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const clickedBtn = document.getElementById(`filterBtn-${category}`);
  if (clickedBtn) clickedBtn.classList.add('active');

  const cards = document.querySelectorAll('.blog-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// Blog Reader - Open Specific Article on "Read More"
function openBlogArticle(articleId) {
  if (!articleId) return;
  // Clean id if prefixed with #
  const cleanId = articleId.replace(/^#/, '');
  const target = document.getElementById(cleanId);
  if (!target) return;

  // Hide grid directory and hero so article opens immediately right at the top
  const grid = document.getElementById('blogGrid');
  const gridSection = grid ? grid.closest('section') : null;
  const heroSection = document.querySelector('.blog-hero');
  if (gridSection) gridSection.style.display = 'none';
  if (heroSection) heroSection.style.display = 'none';

  // Hide all articles
  document.querySelectorAll('.blog-article-wrapper').forEach(el => {
    el.classList.remove('active');
  });

  // Activate target article
  target.classList.add('active');

  // Scroll smoothly to top of reader
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update hash without jump
  if (history.pushState) {
    history.pushState(null, '', '#' + cleanId);
  } else {
    window.location.hash = cleanId;
  }
}

// Close Article and Return to 15 Blog Cards Directory
function closeBlogArticle() {
  const grid = document.getElementById('blogGrid');
  const gridSection = grid ? grid.closest('section') : null;
  const heroSection = document.querySelector('.blog-hero');
  if (gridSection) gridSection.style.display = '';
  if (heroSection) heroSection.style.display = '';

  document.querySelectorAll('.blog-article-wrapper').forEach(el => {
    el.classList.remove('active');
  });

  if (history.pushState) {
    history.pushState('', document.title, window.location.pathname + window.location.search);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Attach to window for global access
window.openBlogArticle = openBlogArticle;
window.closeBlogArticle = closeBlogArticle;
window.filterBlogCategory = filterBlogCategory;

// Toggle Ad Showcase Collapsible "Learn More"
function toggleAdDetails(tabId) {
  const pane = document.getElementById('adsPane-' + tabId);
  if (!pane) return;
  const content = pane.querySelector('.ad-collapsible-content');
  const btn = pane.querySelector('.ad-learn-more-btn');
  if (!content || !btn) return;

  const isOpen = content.classList.contains('open');
  if (isOpen) {
    content.classList.remove('open');
    btn.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Learn More &amp; Full Details';
    btn.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
  } else {
    content.classList.add('open');
    btn.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Show Less Details';
    btn.classList.add('active');
    btn.setAttribute('aria-expanded', 'true');
  }
}
window.toggleAdDetails = toggleAdDetails;

// Check URL hash on page load to open article if requested directly
document.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash;
  if (hash && hash.length > 1) {
    const cleanId = hash.substring(1);
    if (document.getElementById(cleanId) && document.getElementById(cleanId).classList.contains('blog-article-wrapper')) {
      setTimeout(() => openBlogArticle(cleanId), 200);
    }
  }
});

// Listen to browser back/forward buttons
window.addEventListener('hashchange', () => {
  const hash = window.location.hash;
  if (hash && hash.length > 1) {
    const cleanId = hash.substring(1);
    if (document.getElementById(cleanId) && document.getElementById(cleanId).classList.contains('blog-article-wrapper')) {
      openBlogArticle(cleanId);
    }
  } else {
    closeBlogArticle();
  }
});
