const fs = require('fs/promises');
const path = require('path');
const HTMLtoDOCX = require('html-to-docx');

const outputPath = path.join(
  __dirname,
  '..',
  'app',
  'assets',
  'documents',
  'GCloud15SignaturePage.docx'
);

const html = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Supplier appointment terms</title>
    <style>
      body {
        font-family: Arial, Helvetica, sans-serif;
        color: #0b0c0c;
        font-size: 11pt;
        line-height: 1.45;
      }
      .paper {
        max-width: 640px;
        margin: 0 auto;
      }
      .kicker {
        margin: 0 0 6px;
        font-size: 16pt;
        font-weight: bold;
      }
      h1 {
        margin: 0 0 10px;
        font-size: 28pt;
        line-height: 1.1;
      }
      h2 {
        margin: 24px 0 12px;
        font-size: 16pt;
      }
      p {
        margin: 0 0 10px;
      }
      .field {
        margin: 20px 0;
      }
      .label {
        font-weight: bold;
        margin-bottom: 6px;
      }
      .line {
        letter-spacing: 1px;
      }
      .checkbox {
        margin-top: 14px;
      }
      .signature {
        margin-top: 24px;
      }
      .small {
        font-size: 10pt;
      }
    </style>
  </head>
  <body>
    <div class="paper">
      <p class="kicker">G-Cloud 15 Framework Agreement</p>
      <h1>Supplier appointment terms</h1>

      <h2>1. The Appointment</h2>
      <p><strong>This section includes terms about the Supplier appointment.</strong></p>

      <p><strong>1.1 Appointment</strong><br />
      Under the terms of this Framework Agreement (RM1557.15) and the Supplier's Application, the Minister for the Cabinet Office, represented by the Government Commercial Agency (GCA, 9th Floor, The Capital, Old Hall Street, Liverpool, L3 9PP), appoints:</p>

      <p><strong>Company number:</strong> 92330738</p>
      <p><strong>Registered address:</strong> 123 Fake Road, Madeupolis, A11 1AA</p>

      <p>(the "Supplier"), as a Framework Agreement Supplier of Cloud Services who can be considered for Call-Off Contracts as outlined in the Contract Notice in the Find a Tender Service reference (2024/S 000-005327).</p>

      <p><strong>1.2 Appointment to lots:</strong> Lot 2 Cloud software, Lot 3: Cloud Support Service</p>
      <p><strong>1.3 Appointment starts at:</strong> 6 August 2026</p>
      <p><strong>1.4 Appointment ends at:</strong> 5 February 2028</p>
      <p>As per the framework award form. Initial Framework Contract Period of 18 months. Framework to be opened at the end of the Initial Framework Contract period to run for a further 18 months. Framework to be re-opened at the end of such 18 month period to run for a further 12 months.</p>

      <p><strong>1.5 Framework Agreement extension:</strong> N/A</p>
      <p><strong>1.6 Framework Agreement term:</strong> From and including the date at 1.3 above (Appointment starts at) to and including the date at 1.4 above (Appointment ends at).</p>
      <p><strong>1.7 Call-Off Contract length:</strong> Lots 1a and 1b up to 60 months plus an optional extension period of up to 36 months. Lots 2a, 2b and 3 up to 48 months plus an optional extension period of up to 24 months.</p>
      <p><strong>1.8</strong> The Parties agree that they have read this Framework Agreement and by signing below agree to be bound by its terms.</p>
      <p><strong>1.9</strong> All notices, including the Invitation to Tender and Schedules to this Framework Agreement are expressly part of this Framework Agreement.</p>
      <p><strong>1.10</strong> The Installed Framework Agreement includes an electronically signed Framework Agreement. It is electronically signed by the Supplier when they make it legally declarant confirming their agreement to the G-Cloud 15 Framework Agreement, and countersigned by Government Commercial Agency.</p>

      <p>Agent.</p>
      <p>Read the G-Cloud 15 contract terms and conditions</p>

      <div class="field">
        <p class="label">Your full name</p>
        <p class="line">_______________________________________________</p>
      </div>

      <div class="field">
        <p class="label">Your role in the company</p>
        <p class="line">_______________________________________________</p>
      </div>

      <div class="checkbox">
        <p>[ ] I accept the terms and conditions of the framework agreement</p>
      </div>

      <div class="signature">
        <p class="label">Signature</p>
        <p class="line">_______________________________________________</p>
        <p class="label">Date</p>
        <p class="line">_______________________________________________</p>
      </div>

      <p class="small">This document has been prepared for offline completion.</p>
    </div>
  </body>
</html>
`;

async function buildDocx() {
  const docxBuffer = await HTMLtoDOCX(html, null, {
    table: { row: { cantSplit: true } },
    footer: true,
    pageNumber: true,
  });

  await fs.writeFile(outputPath, docxBuffer);
  console.log(`Created ${outputPath}`);
}

buildDocx().catch((error) => {
  console.error('Failed to create DOCX:', error);
  process.exit(1);
});
