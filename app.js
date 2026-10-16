(function () {
  'use strict';

  var KEY = 'stackend-onboarding-vanilla-v2';
  var LEGACY_KEY = 'stackend-onboarding-vanilla-v1';
  var SOCIAL_SERVICE = 'Social Media & Content Creation';
  var SOFTWARE_SERVICE = 'Software Development';
  var VALIDATION_ENABLED = true;
  var current = 0;
  var services = [];
  var files = { social: [], software: [] };
  var pages = document.querySelectorAll('.page');
  var steps = document.querySelectorAll('.form-step');
  var stepper = document.querySelectorAll('.stepper li');
  var form = document.getElementById('onboarding-form');
  var next = document.getElementById('next-button');
  var back = document.getElementById('back-button');
  var timer;

  function read() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || localStorage.getItem(LEGACY_KEY) || 'null');
    } catch (error) {
      return null;
    }
  }

  function write(data) {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (error) {}
  }

  function show(id) {
    pages.forEach(function (page) {
      var active = page.id === id;
      page.classList.toggle('page--active', active);
      page.setAttribute('aria-hidden', String(!active));
    });
    window.scrollTo(0, 0);
  }

  function values() {
    var data = {};
    new FormData(form).forEach(function (value, key) {
      if (value instanceof File) return;
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        data[key] = Array.isArray(data[key]) ? data[key].concat(value) : [data[key], value];
      } else {
        data[key] = value;
      }
    });
    return data;
  }

  function save() {
    var status = document.getElementById('save-status');
    status.textContent = '… Saving changes';
    clearTimeout(timer);
    timer = setTimeout(function () {
      write({ step: current, services: services, values: values(), files: files });
      status.textContent = '✓ Progress saved locally';
    }, 250);
  }

  function normalizeLegacyServices(selected) {
    var legacySocial = selected.indexOf('Social Media Management') !== -1 || selected.indexOf('Content & Digital Marketing') !== -1;
    var legacySoftware = selected.indexOf('Website Development') !== -1 || selected.indexOf('Software & Custom Solutions') !== -1;
    var normalized = selected.filter(function (service) {
      return service !== 'Social Media Management' && service !== 'Content & Digital Marketing' && service !== 'Website Development' && service !== 'Software & Custom Solutions';
    });
    if (legacySocial && normalized.indexOf(SOCIAL_SERVICE) === -1) normalized.unshift(SOCIAL_SERVICE);
    if (legacySoftware && normalized.indexOf(SOFTWARE_SERVICE) === -1) normalized.push(SOFTWARE_SERVICE);
    return normalized;
  }

  function restoreValues(data) {
    Object.keys(data || {}).forEach(function (name) {
      var controls = form.querySelectorAll('[name="' + CSS.escape(name) + '"]');
      var stored = Array.isArray(data[name]) ? data[name] : [data[name]];
      controls.forEach(function (control) {
        if (control.type === 'checkbox' || control.type === 'radio') {
          control.checked = stored.indexOf(control.value) !== -1;
        } else if (stored[0] != null) {
          control.value = stored[0];
        }
      });
    });
  }

  function syncServiceCards() {
    document.querySelectorAll('.service-card').forEach(function (card) {
      var chosen = services.indexOf(card.dataset.service) !== -1;
      card.classList.toggle('is-selected', chosen);
      card.setAttribute('aria-pressed', String(chosen));
      card.querySelector('strong').textContent = chosen ? '✓ Service selected' : '○ Select service';
    });
  }

  function restore() {
    var draft = read();
    if (!draft) return;
    services = normalizeLegacyServices(Array.isArray(draft.services) ? draft.services : []);
    restoreValues(draft.values || {});
    if (draft.files && !Array.isArray(draft.files)) {
      files.social = draft.files.social || [];
      files.software = draft.files.software || draft.files.reference || [];
    }
    syncServiceCards();
    current = Math.max(0, Math.min(Number(draft.step) || 0, 3));
  }

  function setRequired(selector, active) {
    document.querySelectorAll(selector).forEach(function (control) {
      control.required = active;
      control.disabled = !active;
      if (!active) control.classList.remove('is-invalid');
    });
  }

  function togglePanel(panel, active) {
    panel.hidden = !active;
    panel.querySelectorAll('input, select, textarea').forEach(function (control) { control.disabled = !active; });
  }

  function updateSoftwareFlow(hasSoftware) {
    var softwareBrief = document.getElementById('software-development-brief');
    var purpose = form.querySelector('[name="softwarePurpose"]:checked');
    var purposeValue = purpose ? purpose.value : '';
    var isNew = hasSoftware && purposeValue === 'New site or system';
    var isExisting = hasSoftware && (purposeValue === 'Update or upgrade' || purposeValue === 'Maintenance services');
    var contentValue = isNew && form.elements.contentReadiness ? form.elements.contentReadiness.value : '';
    var needsContentSupport = isNew && (contentValue === 'Some content is ready' || contentValue === 'No, I need help');
    var hasDomain = isNew && form.elements.domainStatus && form.elements.domainStatus.value === 'Yes';
    var hasHosting = isNew && form.elements.hostingStatus && form.elements.hostingStatus.value === 'Yes';

    softwareBrief.hidden = !hasSoftware;
    softwareBrief.querySelectorAll('input, select, textarea').forEach(function (control) { control.disabled = !hasSoftware; });
    if (!hasSoftware) return;

    togglePanel(document.getElementById('existing-system-fields'), isExisting);
    togglePanel(document.getElementById('new-software-fields'), isNew);
    togglePanel(document.getElementById('content-support-fields'), needsContentSupport);
    togglePanel(document.getElementById('domain-name-field'), hasDomain);
    togglePanel(document.getElementById('hosting-provider-field'), hasHosting);

    setRequired('[data-existing-required]', isExisting);
    setRequired('[data-new-software-required]', isNew);
    setRequired('[data-content-support-required]', needsContentSupport);
    setRequired('[data-domain-required]', hasDomain);
    setRequired('[data-hosting-required]', hasHosting);
    document.getElementById('existing-needs-label').textContent = purposeValue === 'Maintenance services'
      ? 'What issues or maintenance support do you need?'
      : 'What would you like us to improve?';
  }

  function updateProjectBranch() {
    var hasSocial = services.indexOf(SOCIAL_SERVICE) !== -1;
    var hasSoftware = services.indexOf(SOFTWARE_SERVICE) !== -1;
    var socialBrief = document.getElementById('social-media-brief');

    socialBrief.hidden = !hasSocial;
    socialBrief.querySelectorAll('input, select, textarea').forEach(function (control) { control.disabled = !hasSocial; });
    setRequired('[data-branch-required]', hasSocial);
    updateSoftwareFlow(hasSoftware);

    document.getElementById('software-card-number').textContent = hasSocial ? '06' : '01';
    document.getElementById('project-step-title').textContent = hasSocial && hasSoftware
      ? 'Tell us about both projects'
      : (hasSocial ? 'Plan your social presence' : 'Define your software project');
    document.getElementById('project-step-intro').textContent = hasSocial && hasSoftware
      ? 'Complete each tailored brief so we can coordinate the work as one engagement.'
      : (hasSocial ? 'Share the context we need to plan your channels, content and publishing workflow.' : 'Start with the type of engagement. We will only ask for details that apply.');
  }

  function update() {
    updateProjectBranch();
    steps.forEach(function (step, index) { step.classList.toggle('is-active', index === current); });
    stepper.forEach(function (item, index) {
      item.classList.toggle('is-active', index === current);
      item.classList.toggle('is-complete', index < current);
      item.querySelector('b').textContent = index < current ? '✓' : String(index + 1);
    });
    document.getElementById('mobile-progress-bar').style.width = ((current + 1) * 25) + '%';
    back.textContent = current === 0 ? 'Back to welcome' : 'Back';
    next.textContent = current === 3 ? 'Complete onboarding ✓' : 'Save & continue →';
    if (current === 2) renderServices();
    if (current === 3) renderReview();
    save();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function validateRequiredGroups() {
    var okay = true;
    document.querySelectorAll('[data-required-group]').forEach(function (group) {
      if (group.closest('[hidden]')) return;
      var valid = group.querySelectorAll('input:checked').length > 0;
      group.classList.toggle('is-invalid', !valid);
      var error = group.querySelector('.choice-error');
      if (error) error.hidden = valid;
      if (!valid) okay = false;
    });
    return okay;
  }

  function validate() {
    if (!VALIDATION_ENABLED) return true;
    if (current === 1) {
      document.getElementById('service-error').hidden = services.length > 0;
      return services.length > 0;
    }
    if (current === 3) {
      var confirmed = document.getElementById('confirm').checked;
      document.getElementById('confirm-error').hidden = confirmed;
      return confirmed;
    }
    var okay = true;
    steps[current].querySelectorAll('[required]:not(:disabled)').forEach(function (control) {
      var valid = control.checkValidity();
      control.classList.toggle('is-invalid', !valid);
      if (!valid) okay = false;
    });
    if (current === 2 && !validateRequiredGroups()) okay = false;
    var first = steps[current].querySelector('.is-invalid');
    if (first) {
      if (typeof first.focus === 'function') first.focus();
      first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return okay;
  }

  function clean(value) {
    return String(value || '').replace(/[&<>'"]/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character];
    });
  }

  function display(value) {
    if (Array.isArray(value)) return value.join(', ');
    return value || 'Not provided';
  }

  function renderServices() {
    document.getElementById('selected-services').innerHTML = services.map(function (service) {
      return '<span>✓ ' + clean(service) + '</span>';
    }).join('');
  }

  function card(title, step, entries) {
    return '<article class="review-card"><header><h2>' + clean(title) + '</h2><button type="button" data-edit="' + step + '">Edit</button></header><dl class="review-details">' + entries.map(function (entry) {
      return '<div><dt>' + clean(entry[0]) + '</dt><dd>' + clean(display(entry[1])) + '</dd></div>';
    }).join('') + '</dl></article>';
  }

  function renderReview() {
    var data = values();
    var html = card('Business details', 0, [
      ['Full name', data.fullName], ['Business', data.businessName], ['Email', data.email], ['Phone', data.phone], ['Location', data.location],
      ['Industry', data.industry], ['Description', data.description]
    ]);
    html += card('Selected services', 1, [['Services', services]]);
    if (services.indexOf(SOCIAL_SERVICE) !== -1) {
      html += card('Social Media & Content Creation', 2, [
        ['Platforms', data.platforms], ['Current profiles', data.socialProfiles], ['Account status', data.accountStatus], ['Access handover', data.accessStatus],
        ['Brand colours', data.brandColours], ['Brand fonts', data.brandFonts], ['Brand voice', data.brandVoice], ['Priority offers', data.priorityOffers],
        ['Content production', data.contentSupply], ['Competitors', data.competitors],
        ['Brand files', files.social.length ? files.social : 'None'], ['Age range', data.audienceAge], ['Audience gender', data.audienceGender],
        ['Ideal client', data.idealClient], ['Customer types', data.customerTypes], ['Other customer type', data.otherCustomerType],
        ['Audience pain points', data.audiencePainPoints], ['Markets', data.marketLocations], ['Other markets', data.otherMarkets],
        ['Buying motivations', data.buyingMotivations], ['Social media goals', data.socialGoals], ['Content types', data.contentTypes],
        ['Paid social', data.paidSocial], ['Success measures', data.socialSuccessMeasures], ['Content pillars', data.contentPillars],
        ['Content references', data.contentReferences], ['Posting frequency', data.postingFrequency],
        ['Preferred start date', data.socialStartDate], ['Content approver', data.approverName], ['Approver email', data.approverEmail],
        ['Approver WhatsApp', data.approverWhatsApp], ['Approval turnaround', data.approvalTurnaround], ['Key dates', data.keyDates],
        ['Content boundaries', data.contentBoundaries], ['Community management', data.communityGuidance]
      ]);
    }
    if (services.indexOf(SOFTWARE_SERVICE) !== -1) {
      var softwareEntries = [['Project purpose', data.softwarePurpose]];
      if (data.softwarePurpose === 'New site or system') {
        softwareEntries = softwareEntries.concat([
          ['Product type', data.softwareTypes], ['Project overview', data.softwareOverview], ['Primary users', data.softwareUsers],
          ['Must-have features', data.softwareFeatures], ['Primary objective', data.softwareObjective], ['Integrations', data.softwareIntegrations],
          ['Other requirements', data.softwareOther], ['Content readiness', data.contentReadiness], ['Brand colours', data.softwareBrandColours],
          ['Brand fonts', data.softwareBrandFonts], ['Brand voice', data.softwareBrandVoice], ['Brand/content files', files.software.length ? files.software : 'None'],
          ['Domain status', data.domainStatus], ['Domain name', data.domainName], ['Hosting status', data.hostingStatus], ['Hosting provider', data.hostingProvider],
          ['Timeline', data.softwareTimeline], ['Budget', data.softwareBudget], ['Success measures', data.softwareSuccess],
          ['References', data.softwareReferences], ['Notes', data.softwareNotes]
        ]);
      } else {
        softwareEntries = softwareEntries.concat([['Current system URL', data.existingSystemUrl], ['Requested support', data.existingSystemNeeds]]);
      }
      html += card('Software Development', 2, softwareEntries);
    }
    document.getElementById('review-content').innerHTML = html;
  }

  function finish() {
    var data = values();
    document.getElementById('success-message').textContent = 'Thanks, ' + (data.fullName || 'there').split(' ')[0] + '. Your onboarding summary has been saved in this browser.';
    document.getElementById('reference-number').textContent = 'STK-' + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('success-services').innerHTML = services.map(function (service) { return '<span>✓ ' + clean(service) + '</span>'; }).join('');
    write({ step: 3, services: services, values: data, files: files, completed: true });
    show('success');
  }

  function bindFileInput(id, listId, bucket) {
    document.getElementById(id).addEventListener('change', function (event) {
      files[bucket] = Array.from(event.target.files).map(function (file) { return file.name; });
      document.getElementById(listId).innerHTML = files[bucket].map(function (name) { return '<span>▤ ' + clean(name) + '</span>'; }).join('');
      save();
    });
  }

  document.querySelectorAll('[data-open-wizard]').forEach(function (button) {
    button.addEventListener('click', function () { show('wizard'); update(); });
  });
  document.querySelectorAll('[data-go-home]').forEach(function (button) {
    button.addEventListener('click', function (event) { event.preventDefault(); show('welcome'); });
  });
  document.querySelectorAll('.service-card').forEach(function (cardElement) {
    cardElement.setAttribute('aria-pressed', 'false');
    cardElement.addEventListener('click', function () {
      var service = cardElement.dataset.service;
      var index = services.indexOf(service);
      if (index === -1) services.push(service); else services.splice(index, 1);
      syncServiceCards();
      document.getElementById('service-error').hidden = true;
      save();
    });
  });
  form.addEventListener('input', function (event) {
    event.target.classList.remove('is-invalid');
    var group = event.target.closest('[data-required-group]');
    if (group) {
      group.classList.remove('is-invalid');
      var error = group.querySelector('.choice-error');
      if (error) error.hidden = true;
    }
    if (event.target.name === 'softwarePurpose' || event.target.name === 'contentReadiness' || event.target.name === 'domainStatus' || event.target.name === 'hostingStatus') {
      updateSoftwareFlow(services.indexOf(SOFTWARE_SERVICE) !== -1);
    }
    save();
  });
  form.addEventListener('submit', function (event) { event.preventDefault(); });
  next.addEventListener('click', function () { if (validate()) { if (current === 3) finish(); else { current += 1; update(); } } });
  back.addEventListener('click', function () { if (current === 0) show('welcome'); else { current -= 1; update(); } });
  document.getElementById('review-content').addEventListener('click', function (event) {
    var button = event.target.closest('[data-edit]');
    if (button) { current = Number(button.dataset.edit); update(); }
  });
  bindFileInput('social-files', 'social-file-list', 'social');
  bindFileInput('software-files', 'software-file-list', 'software');
  document.getElementById('restart-button').addEventListener('click', function () { document.getElementById('restart-modal').hidden = false; });
  document.getElementById('cancel-restart').addEventListener('click', function () { document.getElementById('restart-modal').hidden = true; });
  document.getElementById('confirm-restart').addEventListener('click', function () {
    try { localStorage.removeItem(KEY); localStorage.removeItem(LEGACY_KEY); } catch (error) {}
    form.reset();
    services = [];
    files = { social: [], software: [] };
    current = 0;
    syncServiceCards();
    document.getElementById('social-file-list').innerHTML = '';
    document.getElementById('software-file-list').innerHTML = '';
    document.getElementById('restart-modal').hidden = true;
    update();
  });
  document.getElementById('print-button').addEventListener('click', function () { window.print(); });
  document.getElementById('view-summary').addEventListener('click', function () { current = 3; show('wizard'); update(); });

  restore();
  if (location.hash === '#onboarding') { show('wizard'); update(); }
}());
