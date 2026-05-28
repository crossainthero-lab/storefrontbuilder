import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';


function Icon({ name, size = 18, fill = 'none', ...props }) {
  const paths = {
    sparkles: 'M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Zm-7 12l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Zm14 1l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7L19 15Z',
    layout: 'M4 5h16v5H4V5Zm0 8h7v6H4v-6Zm10 0h6v6h-6v-6Z',
    save: 'M5 4h12l2 2v14H5V4Zm3 0v6h8V4M8 20v-6h8v6',
    download: 'M12 3v11m0 0 4-4m-4 4-4-4M5 19h14',
    image: 'M4 5h16v14H4V5Zm3 10 3-3 2 2 3-4 3 5M8 9h.01',
    trash: 'M5 7h14M10 11v6m4-6v6M8 7l1-3h6l1 3m-9 0 1 13h8l1-13',
    phone: 'M8 3h8v18H8V3Zm3 15h2',
    bag: 'M6 8h12l-1 12H7L6 8Zm3 0a3 3 0 0 1 6 0',
    check: 'M4 12l5 5L20 6',
    box: 'M4 8l8-4 8 4-8 4-8-4Zm0 0v8l8 4 8-4V8m-8 4v8',
    chevron: 'm6 9 6 6 6-6',
    plus: 'M12 5v14M5 12h14',
    star: 'm12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17l-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z',
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill={fill} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d={paths[name]} />
    </svg>
  );
}

const STORAGE_KEY = 'storefront-preview-builder-products-v1';

const sampleProduct = {
  id: 'sample',
  name: 'Aurelia Handcrafted Leather Tote',
  price: '248',
  compareAtPrice: '320',
  description:
    'A refined everyday tote made from full-grain Italian leather with a structured silhouette, soft microsuede lining, and thoughtful interior organization for workdays, travel, and weekends.',
  features: 'Full-grain pebbled Italian leather\nPadded 14-inch laptop sleeve\nMagnetic top closure and brass feet\nDetachable crossbody strap\nResponsibly made in small batches',
  variants: 'Cognac\nBlack\nOlive\nBone',
  selectedVariant: 'Cognac',
  stockStatus: 'In stock — ships in 1–2 business days',
  shipping: 'Free carbon-neutral shipping over $75. Easy 30-day returns with prepaid labels on unworn items.',
  details:
    'Dimensions: 15.5” W × 11.75” H × 5.5” D\nMaterials: full-grain leather, microsuede lining, solid brass hardware\nCare: wipe clean with a soft dry cloth and condition every 6 months',
  quantity: 1,
  reviews: {
    rating: 4.8,
    count: 126,
    quote: 'Beautifully made, structured without feeling stiff, and the perfect size for my laptop and daily essentials.',
    author: 'Maya R.',
  },
  images: [],
};

function makeSampleImage(title, subtitle, background, accent) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#fffaf2" />
          <stop offset="1" stop-color="${background}" />
        </linearGradient>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="38" stdDeviation="34" flood-color="#2b241c" flood-opacity=".22"/>
        </filter>
      </defs>
      <rect width="1200" height="1200" fill="url(#bg)"/>
      <circle cx="1050" cy="150" r="180" fill="#ffffff" opacity=".38"/>
      <circle cx="130" cy="1040" r="240" fill="#ffffff" opacity=".35"/>
      <g filter="url(#shadow)">
        <path d="M370 402 C382 308 452 246 600 246 C748 246 818 308 830 402" fill="none" stroke="#392a1f" stroke-width="44" stroke-linecap="round"/>
        <path d="M278 420 C274 372 310 332 358 332 H842 C890 332 926 372 922 420 L880 900 C876 950 834 988 784 988 H416 C366 988 324 950 320 900 Z" fill="${accent}"/>
        <path d="M336 420 H864 L832 895 C830 922 808 942 781 942 H419 C392 942 370 922 368 895 Z" fill="#ffffff" opacity=".12"/>
        <path d="M365 485 H835" stroke="#1f1712" stroke-width="10" opacity=".14"/>
        <path d="M455 585 H745" stroke="#ffffff" stroke-width="18" opacity=".35" stroke-linecap="round"/>
        <path d="M455 645 H700" stroke="#ffffff" stroke-width="18" opacity=".22" stroke-linecap="round"/>
      </g>
      <text x="600" y="108" text-anchor="middle" font-family="Georgia, serif" font-size="58" font-weight="700" fill="#2d2721">${title}</text>
      <text x="600" y="180" text-anchor="middle" font-family="Arial, sans-serif" font-size="27" font-weight="700" letter-spacing="4" fill="#7d6a55">${subtitle}</text>
    </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const starterImages = [
  {
    name: 'Studio front',
    dataUrl: makeSampleImage('Aurelia Tote', 'STUDIO FRONT', '#eadfcd', '#9a643c'),
  },
  {
    name: 'Interior detail',
    dataUrl: makeSampleImage('Soft Interior', 'DETAIL VIEW', '#e5e1d6', '#2f2923'),
  },
  {
    name: 'Lifestyle',
    dataUrl: makeSampleImage('Everyday Carry', 'LIFESTYLE', '#ded8c9', '#6f7750'),
  },
];

function linesToArray(value) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function currency(value) {
  const numeric = Number.parseFloat(value);
  if (Number.isNaN(numeric)) return value ? `$${value}` : '$0';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(numeric);
}

function loadSavedProducts() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function Field({ label, hint, children }) {
  return (
    <label className="field">
      <span>
        {label}
        {hint && <small>{hint}</small>}
      </span>
      {children}
    </label>
  );
}

function App() {
  const [product, setProduct] = useState(() => ({ ...sampleProduct, images: starterImages }));
  const [savedProducts, setSavedProducts] = useState(loadSavedProducts);
  const [activeImage, setActiveImage] = useState(0);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [expanded, setExpanded] = useState({ details: true, shipping: true });
  const previewRef = useRef(null);

  useEffect(() => {
    if (activeImage > product.images.length - 1) setActiveImage(0);
  }, [activeImage, product.images.length]);

  const features = useMemo(() => linesToArray(product.features), [product.features]);
  const variants = useMemo(() => linesToArray(product.variants), [product.variants]);
  const details = useMemo(() => linesToArray(product.details), [product.details]);

  const updateProduct = (field, value) => {
    setProduct((current) => ({ ...current, [field]: value }));
  };

  const handleImages = async (event) => {
    const files = Array.from(event.target.files || []);
    const reads = files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve({ name: file.name, dataUrl: reader.result });
          reader.readAsDataURL(file);
        }),
    );
    const uploaded = await Promise.all(reads);
    setProduct((current) => ({ ...current, images: [...current.images, ...uploaded] }));
    event.target.value = '';
  };

  const removeImage = (indexToRemove) => {
    setProduct((current) => ({
      ...current,
      images: current.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const saveProduct = () => {
    const stamped = {
      ...product,
      id: product.id === 'sample' ? crypto.randomUUID() : product.id,
      savedAt: new Date().toISOString(),
    };
    const next = [stamped, ...savedProducts.filter((item) => item.id !== stamped.id)].slice(0, 12);
    setProduct(stamped);
    setSavedProducts(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const loadProduct = (item) => {
    setProduct(item);
    setActiveImage(0);
  };

  const deleteProduct = (id) => {
    const next = savedProducts.filter((item) => item.id !== id);
    setSavedProducts(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const resetToSample = () => {
    setProduct({ ...sampleProduct, id: crypto.randomUUID(), images: starterImages });
    setActiveImage(0);
  };

  const exportPng = async () => {
    if (!previewRef.current) return;
    const node = previewRef.current;
    const rect = node.getBoundingClientRect();
    const clone = node.cloneNode(true);
    clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    const styles = Array.from(document.styleSheets)
      .map((sheet) => {
        try {
          return Array.from(sheet.cssRules).map((rule) => rule.cssText).join('');
        } catch {
          return '';
        }
      })
      .join('');
    const html = `<style>${styles}</style>${clone.outerHTML}`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}"><foreignObject width="100%" height="100%">${html}</foreignObject></svg>`;
    const svgUrl = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = Math.ceil(rect.width * 2);
      canvas.height = Math.ceil(rect.height * 2);
      const context = canvas.getContext('2d');
      context.fillStyle = '#f6f4ef';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.scale(2, 2);
      context.drawImage(image, 0, 0);
      URL.revokeObjectURL(svgUrl);
      const link = document.createElement('a');
      link.download = `${product.name || 'storefront-preview'}.png`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    image.src = svgUrl;
  };

  const primaryImage = product.images[activeImage]?.dataUrl;

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow"><Icon name="sparkles" size={16} /> Premium ecommerce mockup studio</p>
          <h1>Storefront Preview Builder</h1>
          <p>
            Create polished product-page previews from your product photos and copy before building your actual online store.
          </p>
        </div>
        <div className="hero-actions">
          <button className="secondary" onClick={resetToSample} type="button">
            <Icon name="layout" size={17} /> Sample data
          </button>
          <button className="secondary" onClick={saveProduct} type="button">
            <Icon name="save" size={17} /> Save locally
          </button>
          <button className="primary" onClick={exportPng} type="button">
            <Icon name="download" size={17} /> Export PNG
          </button>
        </div>
      </header>

      <main className="workspace">
        <aside className="editor-panel" aria-label="Product editor">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Live inputs</p>
              <h2>Product information</h2>
            </div>
            <span className="status-dot">Instant preview</span>
          </div>

          <Field label="Product photos" hint="Upload multiple images">
            <div className="upload-box">
              <Icon name="image" size={24} />
              <strong>Add product photos</strong>
              <small>PNG, JPG, WebP — appears in the gallery instantly.</small>
              <input type="file" accept="image/*" multiple onChange={handleImages} />
            </div>
          </Field>

          {product.images.length > 0 && (
            <div className="uploaded-list">
              {product.images.map((image, index) => (
                <button
                  className={index === activeImage ? 'uploaded-thumb active' : 'uploaded-thumb'}
                  key={`${image.name}-${index}`}
                  onClick={() => setActiveImage(index)}
                  type="button"
                >
                  <img src={image.dataUrl} alt={image.name} />
                  <span>{image.name}</span>
                  <Icon name="trash" size={14} onClick={(event) => { event.stopPropagation(); removeImage(index); }} />
                </button>
              ))}
            </div>
          )}

          <div className="form-grid">
            <Field label="Product title">
              <input value={product.name} onChange={(event) => updateProduct('name', event.target.value)} />
            </Field>
            <Field label="Price">
              <input value={product.price} onChange={(event) => updateProduct('price', event.target.value)} />
            </Field>
            <Field label="Compare-at price" hint="Optional sale anchor">
              <input value={product.compareAtPrice} onChange={(event) => updateProduct('compareAtPrice', event.target.value)} />
            </Field>
            <Field label="Stock status">
              <input value={product.stockStatus} onChange={(event) => updateProduct('stockStatus', event.target.value)} />
            </Field>
          </div>

          <Field label="Description">
            <textarea rows="5" value={product.description} onChange={(event) => updateProduct('description', event.target.value)} />
          </Field>
          <Field label="Bullet-point features" hint="One per line">
            <textarea rows="5" value={product.features} onChange={(event) => updateProduct('features', event.target.value)} />
          </Field>
          <Field label="Colour / variant options" hint="One per line">
            <textarea rows="4" value={product.variants} onChange={(event) => updateProduct('variants', event.target.value)} />
          </Field>
          <Field label="Shipping / returns notes">
            <textarea rows="3" value={product.shipping} onChange={(event) => updateProduct('shipping', event.target.value)} />
          </Field>
          <Field label="Product details" hint="One per line">
            <textarea rows="4" value={product.details} onChange={(event) => updateProduct('details', event.target.value)} />
          </Field>

          <div className="saved-products">
            <div className="saved-heading">
              <h3>Saved products</h3>
              <small>Stored in this browser</small>
            </div>
            {savedProducts.length === 0 ? (
              <p className="empty-state">Save a product to load it again later.</p>
            ) : (
              savedProducts.map((item) => (
                <div className="saved-card" key={item.id}>
                  <button type="button" onClick={() => loadProduct(item)}>
                    <strong>{item.name}</strong>
                    <span>{currency(item.price)} · {item.images.length} photos</span>
                  </button>
                  <Icon name="trash" size={16} onClick={() => deleteProduct(item.id)} />
                </div>
              ))
            )}
          </div>
        </aside>

        <section className="preview-column">
          <div className="preview-toolbar">
            <div>
              <p className="eyebrow">Premium listing preview</p>
              <h2>Ready to screenshot, export, or share</h2>
            </div>
            <div className="toggle-group" role="group" aria-label="Preview size">
              <button className={previewMode === 'desktop' ? 'active' : ''} onClick={() => setPreviewMode('desktop')} type="button">
                <Icon name="layout" size={16} /> Desktop
              </button>
              <button className={previewMode === 'mobile' ? 'active' : ''} onClick={() => setPreviewMode('mobile')} type="button">
                <Icon name="phone" size={16} /> Mobile
              </button>
            </div>
          </div>

          <div className={`preview-frame ${previewMode}`}>
            <article className="storefront-preview" ref={previewRef}>
              <div className="brand-bar">
                <div className="brand-mark">SB</div>
                <nav>
                  <span>New arrivals</span>
                  <span>Signature</span>
                  <span>Journal</span>
                </nav>
                <Icon name="bag" size={20} />
              </div>

              <div className="product-layout">
                <section className="gallery-card">
                  <div className="image-stage">
                    {primaryImage ? <img src={primaryImage} alt={product.name} /> : <Icon name="box" size={64} />}
                    <span className="image-badge"><Icon name="check" size={14} /> Editor's pick</span>
                  </div>
                  <div className="thumbnail-row">
                    {product.images.map((image, index) => (
                      <button
                        className={index === activeImage ? 'thumb active' : 'thumb'}
                        key={`${image.name}-preview-${index}`}
                        onClick={() => setActiveImage(index)}
                        type="button"
                      >
                        <img src={image.dataUrl} alt={`${product.name} thumbnail ${index + 1}`} />
                      </button>
                    ))}
                  </div>
                </section>

                <section className="purchase-card">
                  <p className="store-tag">The Atelier Collection</p>
                  <h2>{product.name || 'Untitled product'}</h2>
                  <div className="review-strip">
                    <span className="stars">★★★★★</span>
                    <strong>{product.reviews.rating}</strong>
                    <span>({product.reviews.count} reviews)</span>
                  </div>
                  <div className="price-row">
                    <strong>{currency(product.price)}</strong>
                    {product.compareAtPrice && <span>{currency(product.compareAtPrice)}</span>}
                    {product.compareAtPrice && <em>Sale</em>}
                  </div>
                  <p className="description">{product.description}</p>

                  {features.length > 0 && (
                    <ul className="feature-list">
                      {features.map((feature) => <li key={feature}>{feature}</li>)}
                    </ul>
                  )}

                  {variants.length > 0 && (
                    <div className="variant-block">
                      <div className="option-heading">
                        <strong>Colour</strong>
                        <span>{product.selectedVariant || variants[0]}</span>
                      </div>
                      <div className="variant-grid">
                        {variants.map((variant) => (
                          <button
                            className={(product.selectedVariant || variants[0]) === variant ? 'active' : ''}
                            key={variant}
                            onClick={() => updateProduct('selectedVariant', variant)}
                            type="button"
                          >
                            {variant}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="quantity-row">
                    <span>Quantity</span>
                    <div className="stepper">
                      <button type="button" onClick={() => updateProduct('quantity', Math.max(1, Number(product.quantity) - 1))}>−</button>
                      <strong>{product.quantity}</strong>
                      <button type="button" onClick={() => updateProduct('quantity', Number(product.quantity) + 1)}><Icon name="plus" size={15} /></button>
                    </div>
                  </div>

                  <div className="cta-stack">
                    <button className="add-cart" type="button">Add to Cart</button>
                    <button className="buy-now" type="button">Buy Now</button>
                  </div>

                  <div className="assurance-grid">
                    <span><Icon name="box" size={17} /> {product.stockStatus}</span>
                    <span><Icon name="check" size={17} /> Secure checkout mockup</span>
                  </div>
                </section>
              </div>

              <section className="preview-lower">
                <div className="accordion-card">
                  <button type="button" onClick={() => setExpanded((value) => ({ ...value, shipping: !value.shipping }))}>
                    Shipping & returns <Icon name="chevron" size={18} />
                  </button>
                  {expanded.shipping && <p>{product.shipping}</p>}
                </div>
                <div className="accordion-card">
                  <button type="button" onClick={() => setExpanded((value) => ({ ...value, details: !value.details }))}>
                    Product details <Icon name="chevron" size={18} />
                  </button>
                  {expanded.details && (
                    <ul>{details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                  )}
                </div>
                <div className="reviews-card">
                  <div>
                    <p className="eyebrow">Customer reviews</p>
                    <h3>{product.reviews.rating}/5 average rating</h3>
                  </div>
                  <div className="review-meter"><span style={{ width: `${(product.reviews.rating / 5) * 100}%` }} /></div>
                  <blockquote>
                    <Icon name="star" size={18} fill="currentColor" /> “{product.reviews.quote}”
                    <cite>— {product.reviews.author}</cite>
                  </blockquote>
                </div>
              </section>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
