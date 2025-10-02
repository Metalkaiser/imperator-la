/*/ ===== Catálogos base =====
type ID = string;

// ISO
type CountryCode = string;    // ISO 3166-1 alpha-2, p.ej. "CL", "DE", "JP", "VE"
type SubdivisionCode = string; // ISO 3166-2 (región/estado/provincia)
type CurrencyCode = string;   // ISO 4217, p.ej. "CLP","EUR","JPY","USD"
type TaxIdType = 'VAT'|'GST'|'TIN'|'NIF'|'RFC'|'CUIT'|'RUC'|'ABN'|'CompanyNumber'|'Other';

// ---------- Parties (emisor/receptor/proveedor) ----------
interface Address {
  line1: string;
  line2?: string;
  city?: string;
  postalCode?: string;
  subdivisionCode?: SubdivisionCode;
  country: CountryCode;
}

interface TaxRegistration {
  type: TaxIdType;        // tipo de identificación fiscal local (ej. VAT, GST, NIF)
  value: string;          // número (ej. DE123456789)
  country?: CountryCode;  // país emisor del registro
  validFrom?: string;     // ISO date
  validTo?: string;       // ISO date
  metadata?: Record<string, any>;
}

interface Party {
  id: ID;
  legalName: string;
  tradeName?: string;
  taxRegistrations: TaxRegistration[]; // puede tener múltiples registros (local, UE, etc.)
  addresses: Address[];
  contact?: { email?: string; phone?: string; };
  isOrganization: boolean;
  metadata?: Record<string, any>;
}

// ---------- Organización y establecimientos ----------
interface Organization extends Party {
  // hereda legalName, taxRegistrations, etc.
}

interface Establishment {
  id: ID;
  organizationId: ID;
  name: string;           // Sucursal / Punto de venta
  address: Address;
  // numeración fiscal por establecimiento
  numberingSequences: NumberingSequence[];
  metadata?: Record<string, any>;
}

interface NumberingSequence {
  id: ID;
  code: string;           // p.ej. "A-2025", "POS-SCL-1"
  description?: string;
  prefix?: string;
  suffix?: string;
  padding?: number;       // ancho con ceros
  nextNumber: number;
  scope: 'INVOICE'|'CREDIT_NOTE'|'DEBIT_NOTE'|'RECEIPT'|'DELIVERY_NOTE';
  active: boolean;
}

// ---------- Moneda y FX ----------
/*interface ExchangeRate {
  id: ID;
  baseCurrency: CurrencyCode;       // p.ej. "USD"
  quoteCurrency: CurrencyCode;      // p.ej. "CLP"
  rate: number;                     // unidades de quote por 1 base
  source: 'Official'|'ECB'|'Custom'|'Other';
  asOf: string;                     // timestamp del tipo de cambio
  metadata?: Record<string, any>;
}

// ---------- Impuestos, jurisdicciones y reglas ----------
type TaxScope = 'FEDERAL'|'STATE'|'PROVINCIAL'|'MUNICIPAL'|'SPECIAL_ZONE'|'CROSS_BORDER';

/*interface TaxJurisdiction {
  id: ID;
  country: CountryCode;
  name: string;                   // p.ej. "Bavaria", "Tokyo Metropolis", "RM"
  scope: TaxScope;
  subdivisionCode?: SubdivisionCode;
  metadata?: Record<string, any>;
}

type TaxCalcMethod = 'PRICE_INCLUSIVE'|'PRICE_EXCLUSIVE'|'FIXED_AMOUNT'|'WITHHOLDING';

/*interface TaxRate {
  id: ID;
  code: string;                   // p.ej. "VAT_STD_DE", "GST_10_JP", "IVA_RED_CL"
  displayName: string;            // nombre amigable
  jurisdictionId: ID;             // FK → TaxJurisdiction
  type: 'VAT_GST'|'SALES_TAX'|'CONSUMPTION'|'SERVICE'|'WITHHOLDING'|'OTHER';
  percentage?: number;            // null si es monto fijo
  fixedAmount?: number;           // por unidad o por documento (ver rule)
  calculation: TaxCalcMethod;
  category?: 'STANDARD'|'REDUCED'|'SUPER_REDUCED'|'ZERO'|'EXEMPT'|'OUT_OF_SCOPE'|'REVERSE_CHARGE';
  validFrom?: string;
  validTo?: string;
  metadata?: Record<string, any>; // reglas especiales (place-of-supply, umbrales, etc.)
}

interface TaxRuleBinding {
  id: ID;
  itemCategory?: string;      // p.ej. "books", "food", "electronics"
  serviceFlag?: boolean;
  countryOfSupply?: CountryCode;
  countryOfConsumption?: CountryCode;
  // criterios para mapear una línea al TaxRate correcto
  taxRateId: ID;              // FK → TaxRate
}

// ---------- Productos/servicios ----------
interface Item {
  id: ID;
  sku?: string;
  name: string;
  description?: string;
  unitOfMeasure?: string; // ISO/UNECE (p.ej. "EA", "KG", "HUR")
  itemCategory?: string;  // clasificador interno
  hsCode?: string;        // arancel/aduana opcional
  defaultTaxCategory?: 'STANDARD'|'REDUCED'|'ZERO'|'EXEMPT'|'OUT_OF_SCOPE';
  metadata?: Record<string, any>;
}

// ===== Documentos fiscales =====
type InvoiceType = 'INVOICE'|'CREDIT_NOTE'|'DEBIT_NOTE'|'RECEIPT'|'PROFORMA';
type PriceRounding = 'PER_LINE'|'PER_DOCUMENT';

interface Invoice {
  id: ID;
  type: InvoiceType;
  establishmentId: ID;               // punto de emisión
  sellerId: ID;                      // Party (normalmente Organization)
  buyerId: ID;                       // Party
  issueDate: string;                 // fecha de emisión
  dueDate?: string;                  // términos de pago
  currency: CurrencyCode;
  exchangeRateId?: ID;               // si el precio base está en otra moneda
  sequenceId: ID;                    // NumberingSequence aplicada
  sequenceNumber: string;            // "A-2025-000123"
  referenceDocumentId?: ID;          // p.ej. crédito/débito referenciando factura
  // Totales normalizados
  totals: {
    totalExempt: number;             // sumatoria líneas exentas
    totalTaxable: number;            // base imponible agregada
    totalTax: number;                // sumatoria de impuestos
    grandTotal: number;              // importe final
  };
  taxSummaries: InvoiceTaxSummary[]; // por cada tasa/componente aplicado en el documento
  roundingMode?: PriceRounding;
  placeOfSupply?: { country: CountryCode; subdivisionCode?: SubdivisionCode; };
  deliveryCountry?: CountryCode;     // útil para reglas de exportación
  notes?: string;
  attachments?: AttachmentRef[];     // PDF/XML/UBL/PEPPOL, QR, etc.
  status: 'DRAFT'|'ISSUED'|'CANCELLED'|'ANNULLED'|'PAID'|'PARTIALLY_PAID';
  createdAt: string;
  metadata?: Record<string, any>;    // hashes, sellos, timbres, QR legales si aplica
}

interface InvoiceLine {
  id: ID;
  invoiceId: ID;
  itemId?: ID;                 // opcional si es ítem libre
  description: string;
  quantity: number;
  unitPrice: number;           // en moneda del documento
  discountAmount?: number;     // monto
  discountPercent?: number;    // %
  lineSubtotal: number;        // (qty*price - descuentos) antes de impuestos
  // impuestos desglosados por componente (pueden ser varios)
  taxes: LineTaxComponent[];
  lineTotal: number;           // subtotal + impuestos (si exclusivos)
  metadata?: Record<string, any>;
}

interface LineTaxComponent {
  taxRateId: ID;               // FK → TaxRate
  name: string;                // legible (p.ej. "VAT 19% DE")
  category?: string;           // STANDARD/REDUCED/ZERO/EXEMPT/REVERSE_CHARGE
  calculation: TaxCalcMethod;  // EXCLUSIVE/INCLUSIVE/etc.
  baseAmount: number;          // base utilizada para el cálculo
  amount: number;              // monto del impuesto en la línea
  isWithholding?: boolean;     // retención
}

interface InvoiceTaxSummary {
  taxRateId: ID;
  name: string;
  category?: string;
  baseAmount: number;
  amount: number;
  isWithholding?: boolean;
}

interface AttachmentRef {
  id: ID;
  type: 'PDF'|'XML'|'JSON'|'IMAGE'|'OTHER';
  url?: string;                // o storage path
  hash?: string;               // integridad
  description?: string;
}

// ---------- Pagos y conciliación ----------
type PaymentMethodCode = 'CASH'|'CARD'|'BANK_TRANSFER'|'WALLET'|'CHECK'|'OTHER';

/*interface Payment {
  id: ID;
  payerId: ID;                 // normalmente buyerId
  payeeId: ID;                 // normalmente sellerId
  date: string;
  currency: CurrencyCode;
  amount: number;
  method: PaymentMethodCode;
  reference?: string;          // nº transacción/comprobante
  fxRateId?: ID;               // si el pago fue en otra moneda
  metadata?: Record<string, any>;
}

interface PaymentApplication {
  id: ID;
  paymentId: ID;
  invoiceId: ID;
  appliedAmount: number;
  createdAt: string;
}

// ---------- Libros y reportes (por periodo) ----------
interface SalesLedgerEntry { // “Libro de Ventas” genérico
  id: ID;
  invoiceId: ID;
  issueDate: string;
  buyerTaxId?: string;
  sequenceNumber: string;
  currency: CurrencyCode;
  totalExempt: number;
  totalTaxable: number;
  totalTax: number;
  grandTotal: number;
  taxBreakdown: { taxRateId: ID; base: number; amount: number; }[];
  fxRateAtIssue?: number;
  period: string; // p.ej. "2025-08"
  metadata?: Record<string, any>;
}

// ---------- Auditoría (inmutable) ----------
type AuditAction = 'INSERT'|'UPDATE'|'DELETE'|'ISSUE'|'CANCEL'|'PAY'|'REFUND'|'ANNUL';

/*interface AuditTrail {
  id: ID;
  timestamp: string;
  userId?: ID;
  entity: 'Invoice'|'InvoiceLine'|'Payment'|'Party'|'Item'|'TaxRate'|'NumberingSequence'|'Other';
  entityId: ID;
  action: AuditAction;
  field?: string;            // si UPDATE campo por campo
  oldValue?: any;
  newValue?: any;
  ip?: string;
  device?: string;
  // seguridad extra:
  docHash?: string;          // hash del documento antes/después (encadenable)
  prevAuditHash?: string;    // para hash chain (inmutabilidad lógica)
}

// ---------- Activity logs (macro) ----------
interface ActivityLog {
  id: ID;
  timestamp: string;
  userId?: ID;
  action: string;            // "LOGIN","CREATE_INVOICE","EXPORT_LEDGER"
  entity?: string;
  entityId?: ID;
  status?: 'success'|'failure';
  details?: Record<string, any>;
}*/

/*
 * Por qué este modelo funciona “en cualquier país”

 - Impuestos componibles: cada línea puede tener múltiples componentes (IVA/GST, impuestos específicos, recargos, retenciones).
 - Jurisdicciones: separas TaxJurisdiction y TaxRate; puedes modelar federal/estatal/municipal o áreas especiales.
 - Categorías y casos especiales: category y calculation admiten exento, tasa cero, fuera de alcance, reverse charge, o impuesto incluido en precio (común en Japón/UE).
 - Moneda y tipo de cambio: ExchangeRate e Invoice.exchangeRateId + asOf—evita ambigüedad ante pagos en otra moneda.
 - Numeración por sede: NumberingSequence por Establishment (muy común: serie por sucursal o punto de venta).
 - Créditos/débitos: Invoice.type y referenceDocumentId cubren notas de crédito/débito universales.
 - Libros/Reportes: SalesLedgerEntry permite generar libros de ventas/IVA/GST registrados por período, sin casarte con un formato local.
 - Trazabilidad fuerte: AuditTrail (campo a campo, con hash chain opcional) + ActivityLog (macro) = auditoría interna y externa.
 - Adjuntos legales: attachments soporta PDF/XML (UBL/PEPPOL, Factura-e, etc.) y QR/códigos de verificación.

 * Consejos de implementación

 - Redondeo: define globalmente roundingMode (por línea vs. por documento) y aplica reglas de redondeo por moneda (p. ej., JPY sin decimales).
 - Reglas fiscales: usa TaxRuleBinding para decidir la tasa según item category, place-of-supply, destino, etc. Así no “horneas” leyes en código.
 - Índices:
   - Invoice(sequenceNumber), Invoice(issueDate), Invoice(buyerId), Invoice(status).
   - InvoiceLine(invoiceId).
   - PaymentApplication(invoiceId), Payment(date).
   - SalesLedgerEntry(period).
 - Inmutabilidad fiscal: marca Invoice como ISSUED con lock lógico; posteriores cambios sólo vía Credit/Debit Note o ANNUL con rastro en AuditTrail.
 - Retenciones: modela retenciones como LineTaxComponent.isWithholding = true para restar al neto a pagar y reportar aparte si el país lo exige.
 - Exenciones del comprador: guarda en Party.taxRegistrations los certificados/exenciones con vigencia (validFrom/To) para aplicar categoría EXEMPT o ZERO cuando corresponda.
 - Exportación: almacena snapshots (PDF/XML) al emitir; te salva ante cambios de catálogo o tasas futuras.
 - Privacidad vs. fiscal: los costos y proveedores pueden vivir en products_private y no se incluyen en la factura; la autoridad mira precio de venta, base y tax breakdown.

 * “Mapeo” típico por país (cómo lo usarías)

 - Chile: IVA 19% → TaxRate{ type:'VAT_GST', percentage:19, category:'STANDARD' }; Notas de crédito/debito → Invoice.type.
 - Alemania (UE): VAT 19/7/0, intracomunitario: category:'REVERSE_CHARGE' y placeOfSupply UE; Números DE… en TaxRegistration.
 - Japón: Consumption Tax 10/8, precios tax-in comunes → calculation:'PRICE_INCLUSIVE'; redondeos por línea.
 - EE. UU. (si algún día): múltiples TaxJurisdiction state+county+city con TaxRate componibles tipo sales tax.

 * Módulos opcionales útiles

 - Compliance pack por país: tablas/JSON con TaxRuleBinding precargado por país/industria y periodos de vigencia.
 - Motor de validación: verifica que taxSummaries == suma de LineTaxComponent.
 - Firmas digitales: campos en Invoice.metadata para firma/sello y código de verificación (hash/QR).
 - Storage legal: política de retención por N años configurable por país.
*/