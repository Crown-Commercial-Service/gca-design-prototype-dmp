-- SQL Server (T-SQL) schema for the accreditationCerts data model.
-- Run in an empty database, then reverse engineer it in Visio.
-- applications, suppliers, users and documents are minimal stubs so the foreign keys resolve.

CREATE TABLE suppliers (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL
);

CREATE TABLE applications (
    id INT IDENTITY(1,1) PRIMARY KEY,
    supplier_id INT NOT NULL REFERENCES suppliers(id),
    framework NVARCHAR(50) NOT NULL
);

CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL
);

CREATE TABLE documents (
    id INT IDENTITY(1,1) PRIMARY KEY,
    file_name NVARCHAR(255) NOT NULL
);

CREATE TABLE accreditationCertTypes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    code NVARCHAR(50) NOT NULL UNIQUE,
    name NVARCHAR(255) NOT NULL,
    category NVARCHAR(30) NOT NULL
        CHECK (category IN ('cyber_essentials', 'iso', 'other', 'insurance')),
    validity_months INT NOT NULL
);

CREATE TABLE lotCertRequirements (
    id INT IDENTITY(1,1) PRIMARY KEY,
    lot NVARCHAR(5) NOT NULL,
    cert_type_id INT NOT NULL REFERENCES accreditationCertTypes(id),
    requirement NVARCHAR(20) NOT NULL
        CHECK (requirement IN ('mandatory', 'conditional', 'non_mandatory', 'not_required')),
    requirement_note NVARCHAR(500) NULL,
    min_cover_amount DECIMAL(12,2) NULL,
    min_cover_timing NVARCHAR(20) NULL
        CHECK (min_cover_timing IN ('at_award', 'at_call_off')),
    CONSTRAINT UQ_lotCertRequirements UNIQUE (lot, cert_type_id)
);

CREATE TABLE accreditationCerts (
    id INT IDENTITY(1,1) PRIMARY KEY,
    application_id INT NOT NULL REFERENCES applications(id),
    supplier_id INT NOT NULL REFERENCES suppliers(id),
    cert_type_id INT NOT NULL REFERENCES accreditationCertTypes(id),
    certificate_number NVARCHAR(100) NULL,
    issuer NVARCHAR(255) NULL,
    issue_date DATE NULL,
    expiry_date DATE NULL,
    scope_statement NVARCHAR(MAX) NULL,
    cover_amount DECIMAL(12,2) NULL,
    evidence_document_id INT NULL REFERENCES documents(id),
    status NVARCHAR(20) NOT NULL DEFAULT 'not_started'
        CHECK (status IN ('not_started', 'provided', 'compliant', 'non_compliant', 'expired')),
    validated BIT NOT NULL DEFAULT 0,
    validated_by INT NULL REFERENCES users(id),
    validated_at DATETIME2 NULL,
    notes NVARCHAR(MAX) NULL,
    created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    updated_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT UQ_accreditationCerts UNIQUE (application_id, cert_type_id)
);

CREATE INDEX IX_accreditationCerts_expiry_date ON accreditationCerts(expiry_date);
CREATE INDEX IX_accreditationCerts_status ON accreditationCerts(status);

INSERT INTO accreditationCertTypes (code, name, category, validity_months) VALUES
('CE', 'Cyber Essentials', 'cyber_essentials', 12),
('CE_PLUS', 'Cyber Essentials Plus', 'cyber_essentials', 12),
('ISO_9001', 'ISO 9001', 'iso', 36),
('ISO_27001', 'ISO 27001', 'iso', 36),
('ISO_20000_1', 'ISO 20000-1', 'iso', 36),
('ISO_14001', 'ISO 14001', 'iso', 36),
('ISO_27017', 'ISO 27017', 'iso', 36),
('ISO_27018', 'ISO 27018', 'iso', 36),
('ISO_28000', 'ISO 28000', 'iso', 36),
('CSA_STAR', 'CSA STAR', 'other', 36),
('PCI', 'PCI', 'other', 36),
('EMPLOYERS_LIABILITY', 'Employers liability', 'insurance', 12),
('PUBLIC_LIABILITY', 'Public liability', 'insurance', 12),
('PROFESSIONAL_INDEMNITY', 'Professional indemnity', 'insurance', 12);
