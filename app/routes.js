//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
router.get('/lotSummary', (req, res) => {
	res.render('lotSummary')
})

router.get('/itaAssessment', (req, res) => {
	res.render('itaAssessment')
})

router.get('/itaAssessmentToSign', (req, res) => {
	res.render('itaAssessmentToSign')
})

router.get('/suspend-all-cloud-software', (req, res) => {
	req.session.data.cloudSoftwareSuspended = true
	res.redirect('/suspendLot.html')
})

router.get('/suspendLot.html', (req, res) => {
	const cloudSoftwareSuspended = Boolean(req.session.data.cloudSoftwareSuspended)
	req.session.data.cloudSoftwareSuspended = false
	res.render('suspendLot', { cloudSoftwareSuspended })
})

router.get('/suspendLot', (req, res) => {
	const cloudSoftwareSuspended = Boolean(req.session.data.cloudSoftwareSuspended)
	req.session.data.cloudSoftwareSuspended = false
	res.render('suspendLot', { cloudSoftwareSuspended })
})
