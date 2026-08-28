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

router.get('/DOS72StartPage.html', (req, res) => {
	res.render('DOS72StartPage')
})

router.get('/DOS72StartPage', (req, res) => {
	res.render('DOS72StartPage')
})

router.get('/DOS72ReturningSupplier.html', (req, res) => {
	res.render('DOS72ReturningSupplier')
})

router.get('/DOS72ReturningSupplier', (req, res) => {
	res.render('DOS72ReturningSupplier')
})

router.post('/DOS72ReturningSupplier', (req, res) => {
	const selectedOption = req.body['returning-supplier-option']

	if (selectedOption === 'option-1') {
		return res.redirect('/DOS72OptInOut')
	}

	res.redirect('/DOS72ReturningSupplier')
})

router.get('/DOS72OptInOut.html', (req, res) => {
	res.render('DOS72OptInOut')
})

router.get('/DOS72OptInOut', (req, res) => {
	res.render('DOS72OptInOut')
})

router.post('/DOS72OptInOut', (req, res) => {
	const selectedOption = req.body['dos72-opt-choice']

	if (selectedOption === 'opt-in') {
		return res.redirect('/DOS72OptInOutSuccess')
	}

	if (selectedOption === 'opt-out') {
		return res.redirect('/DOS72OptOutNarrative')
	}

	res.redirect('/DOS72OptInOut')
})

router.get('/DOS72OptInOutSuccess.html', (req, res) => {
	res.render('DOS72OptInOutSuccess')
})

router.get('/DOS72OptInOutSuccess', (req, res) => {
	res.render('DOS72OptInOutSuccess')
})

router.get('/DOS72OptOutNarrative.html', (req, res) => {
	res.render('DOS72OptOutNarrative')
})

router.get('/DOS72OptOutNarrative', (req, res) => {
	res.render('DOS72OptOutNarrative')
})

router.post('/DOS72OptOutNarrative', (req, res) => {
	res.redirect('/DOS72AreYouSure')
})

router.get('/DOS72AreYouSure.html', (req, res) => {
	res.render('DOS72AreYouSure')
})

router.get('/DOS72AreYouSure', (req, res) => {
	res.render('DOS72AreYouSure')
})

router.get('/adminBulkUpload.html', (req, res) => {
	res.render('adminBulkUpload')
})

router.get('/adminBulkUpload', (req, res) => {
	res.render('adminBulkUpload')
})

router.get('/suspend-all-cloud-software', (req, res) => {
	res.redirect('/suspendLotsSuspended.html')
})

router.get('/suspendLotsSuspended.html', (req, res) => {
	res.render('suspendLotsSuspended')
})

router.get('/suspendLotsSuspended', (req, res) => {
	res.render('suspendLotsSuspended')
})

router.get('/unsuspendAreYouSure.html', (req, res) => {
	res.render('unsuspendAreYouSure')
})

router.get('/unsuspendAreYouSure', (req, res) => {
	res.render('unsuspendAreYouSure')
})

router.get('/suspendLotUnsuspended.html', (req, res) => {
	res.render('suspendLotUnsuspended')
})

router.get('/suspendLotUnsuspended', (req, res) => {
	res.render('suspendLotUnsuspended')
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
