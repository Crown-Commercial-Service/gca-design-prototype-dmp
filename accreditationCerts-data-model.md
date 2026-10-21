# accreditationCerts data model

Based on Prototype 11 (Supplier Compliance Options), principally the "Certification requirements by Lot" grid ([certReqsByLot.html](app/views/certReqsByLot.html)), the ISO parts page and the Insurance page.

One row per **supplier application + certificate/insurance type**. Lot requirements (M / NM / N/R, insurance minimums, validity length) are reference data and are held in a separate table, so the status page can still show requirements per lot.

## accreditationCerts

| Column | Type | Null | Notes |
|---|---|---|---|
| id | uuid / bigint PK | no | |
| application_id | FK -> applications | no | Supplier's G-Cloud 15 application |
| supplier_id | FK -> suppliers | no | |
| cert_type_id | FK -> accreditationCertTypes | no | Which certificate or insurance this row is |
| certificate_number | varchar(100) | yes | ISO/CE certificate number; insurance policy reference number |
| issuer | varchar(255) | yes | Certification body / insurer |
| issue_date | date | yes | |
| expiry_date | date | yes | Insurance "Renewal date" is stored here |
| scope_statement | text | yes | Scope / limit of cover as stated |
| cover_amount | decimal(12,2) | yes | Insurance only (e.g. 5000000.00) |
| evidence_document_id | FK -> documents | yes | Uploaded certificate / policy |
| status | enum | no | `not_started`, `provided`, `compliant`, `non_compliant`, `expired` |
| validated | boolean | no | Default false (Insurance "Validated" Yes/No) |
| validated_by | FK -> users | yes | Admin who validated |
| validated_at | timestamp | yes | |
| notes | text | yes | Admin notes / reason for non-compliance |
| created_at / updated_at | timestamp | no | |

Constraints: unique (`application_id`, `cert_type_id`); index on `expiry_date` (expiry reporting) and `status`.

`status` is derived: expired if `expiry_date` is in the past; non-compliant if any lot where the cert is Mandatory is unmet; compliant otherwise. The overall "Accreditations, Certificates and Insurance" row on the application status page is the roll-up of these rows.

## accreditationCertTypes (reference)

| Column | Type | Notes |
|---|---|---|
| id | PK | |
| code | varchar | `CE`, `CE_PLUS`, `ISO_9001`, `ISO_27001`, `ISO_20000_1`, `ISO_14001`, `ISO_27017`, `ISO_27018`, `ISO_28000`, `CSA_STAR`, `PCI`, `EMPLOYERS_LIABILITY`, `PUBLIC_LIABILITY`, `PROFESSIONAL_INDEMNITY` |
| name | varchar | Display name |
| category | enum | `cyber_essentials`, `iso`, `other`, `insurance` |
| validity_months | int | 12 for CE/CE+/insurance, 36 for ISO/CSA STAR/PCI |

## lotCertRequirements (reference)

| Column | Type | Notes |
|---|---|---|
| id | PK | |
| lot | varchar | `1a`, `1b`, `2a`, `2b`, `3` |
| cert_type_id | FK -> accreditationCertTypes | |
| requirement | enum | `mandatory`, `conditional`, `non_mandatory`, `not_required` |
| requirement_note | varchar | e.g. "Resellers can rely on Cloud Service Provider" (M*), "only if providing public cloud services" (M**) |
| min_cover_amount | decimal | Insurance minimum, e.g. 5,000,000 |
| min_cover_timing | enum | `at_award`, `at_call_off` |

Unique (`lot`, `cert_type_id`).

## Relationships

- application 1 — n accreditationCerts
- accreditationCertTypes 1 — n accreditationCerts
- accreditationCertTypes 1 — n lotCertRequirements
- accreditationCerts joins to the application's selected lots (via the services/lots table) and `lotCertRequirements` to work out what is required per lot.
