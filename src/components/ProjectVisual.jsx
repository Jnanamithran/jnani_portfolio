function EkipVisual() {
  return (
    <div className="preview-ekip">
      <div className="preview-sidebar">
        <span className="preview-mark">E</span>
        <span />
        <span />
        <span />
      </div>
      <div className="preview-ekip-main">
        <span className="preview-eyebrow">KNOWLEDGE WORKSPACE</span>
        <div className="preview-query">
          <span>ASK YOUR DOCUMENTS</span>
          <div className="preview-line preview-line-long" />
        </div>
        <div className="preview-answer">
          <span>GROUNDED RESPONSE</span>
          <div className="preview-line preview-line-long" />
          <div className="preview-line" />
          <div className="preview-citation">SOURCE 01 · PDF</div>
        </div>
      </div>
    </div>
  );
}

function LeafyLoopVisual() {
  return (
    <div className="preview-leafy">
      <div className="preview-plant-art" aria-hidden="true">
        <svg viewBox="0 0 160 160" fill="none">
          <path d="M80 139V73M80 103C47 103 34 83 34 56c26 0 46 12 46 47Zm0-18c0-31 16-48 45-48 0 27-16 48-45 48Z" />
          <path d="M80 118c-22 0-35-12-39-33m39-17c5-18 17-28 37-31" />
        </svg>
      </div>
      <div className="preview-product-card">
        <span className="preview-eyebrow">PLANT CATALOG</span>
        <div className="preview-line preview-line-long" />
        <div className="preview-line" />
        <div className="preview-shipping">REGION-AWARE DELIVERY</div>
      </div>
    </div>
  );
}

function ViperVisual() {
  return (
    <div className="preview-viper">
      <div className="preview-viper-labels">
        <span className="preview-eyebrow">PIPE INSPECTION</span>
        <span className="preview-sensor-state">SENSOR FEED</span>
      </div>
      <div className="preview-scan-grid">
        <svg viewBox="0 0 440 150" preserveAspectRatio="none" fill="none">
          <path d="M0 102h55l24-34 34 48 40-68 38 40h48l28-28 37 47 43-59 32 31h61" />
        </svg>
        <div className="preview-scan-point" />
      </div>
      <div className="preview-viper-foot">
        <span>CRAWLER</span>
        <span>VISUAL INSPECTION</span>
        <span>PIPE INTERIOR</span>
      </div>
    </div>
  );
}

function WeddingVisual() {
  return (
    <div className="preview-wedding">
      <span className="preview-eyebrow">A DIGITAL INVITATION</span>
      <div className="preview-invite-card">
        <span className="preview-invite-overline">YOU ARE INVITED</span>
        <span className="preview-invite-rule" />
        <strong>Celebrate<br />together.</strong>
        <div className="preview-invite-footer">
          <span>EVENT TIMELINE</span>
          <span className="preview-rsvp">RSVP ↗</span>
        </div>
      </div>
    </div>
  );
}

function ToothSavvyVisual() {
  return (
    <div className="preview-tooth">
      <div className="preview-tooth-header">
        <span className="preview-eyebrow">CLINIC WORKSPACE</span>
        <span className="preview-tooth-mark">+</span>
      </div>
      <div className="preview-tooth-layout">
        <div className="preview-tooth-panel">
          <span className="preview-eyebrow">PATIENT RECORDS</span>
          <div className="preview-record-line"><i /><span /></div>
          <div className="preview-record-line"><i /><span /></div>
          <div className="preview-record-line"><i /><span /></div>
        </div>
        <div className="preview-tooth-panel preview-tooth-schedule">
          <span className="preview-eyebrow">APPOINTMENTS</span>
          <div className="preview-line preview-line-long" />
          <div className="preview-line" />
          <div className="preview-line preview-line-short" />
        </div>
      </div>
    </div>
  );
}

const PREVIEWS = {
  ekip: EkipVisual,
  leafyloop: LeafyLoopVisual,
  viper: ViperVisual,
  wedding: WeddingVisual,
  toothsavvy: ToothSavvyVisual,
};

export default function ProjectVisual({ project }) {
  const Preview = PREVIEWS[project.visual];

  return (
    <div className={`project-visual project-visual-${project.visual}`} aria-hidden="true">
      <div className="project-visual-topline">
        <span>PROJECT / {project.title.toUpperCase()}</span>
        <span>VISUAL STUDY</span>
      </div>
      <div className="project-visual-canvas">
        <Preview />
      </div>
      <div className="project-visual-footer">
        <span>ILLUSTRATIVE PREVIEW</span>
        <span>JN4NI · {project.category}</span>
      </div>
    </div>
  );
}
