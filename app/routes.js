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

router.get('/DOS72Options.html', (req, res) => {
	res.render('DOS72Options')
})

router.get('/DOS72Options', (req, res) => {
	res.render('DOS72Options')
})

router.post('/DOS72Options', (req, res) => {
	const selectedOption = req.body['dos72-options-choice']

	if (selectedOption === 'option-1') {
		return res.redirect('/DOS72StartPage')
	}

	if (selectedOption === 'option-2') {
		return res.redirect('/DOS72FlowOptions')
	}

	res.redirect('/DOS72Options')
})

router.get('/DOS72FlowOptions.html', (req, res) => {
	res.render('DOS72FlowOptions')
})

router.get('/DOS72FlowOptions', (req, res) => {
	res.render('DOS72FlowOptions')
})

router.get('/DOS72ExistingSupplierMigratedData.html', (req, res) => {
	res.render('DOS72ExistingSupplierMigratedData')
})

router.get('/DOS72ExistingSupplierMigratedData', (req, res) => {
	res.render('DOS72ExistingSupplierMigratedData')
})

router.get('/DOS72FreshApplication.html', (req, res) => {
	res.render('DOS72FreshApplication')
})

router.get('/DOS72FreshApplication', (req, res) => {
	res.render('DOS72FreshApplication')
})

router.get('/DOS72ExisitngYourAccount.html', (req, res) => {
	req.session.data.dos72Lot1Removed = false
	req.session.data.dos72Lot1JustRemoved = false
	req.session.data.dos72Lot1JustAdded = false
	res.render('DOS72ExisitngYourAccount')
})

router.get('/DOS72ExisitngYourAccount', (req, res) => {
	req.session.data.dos72Lot1Removed = false
	req.session.data.dos72Lot1JustRemoved = false
	req.session.data.dos72Lot1JustAdded = false
	res.render('DOS72ExisitngYourAccount')
})

router.get('/DOS72ExistingProgress.html', (req, res) => {
	res.render('DOS72ExistingProgress')
})

router.get('/DOS72ExistingProgress', (req, res) => {
	res.render('DOS72ExistingProgress')
})

router.get('/DOS72ExistingDeclaration.html', (req, res) => {
	res.render('DOS72ExistingDeclaration')
})

router.get('/DOS72ExistingDeclaration', (req, res) => {
	res.render('DOS72ExistingDeclaration')
})

const dos72Lots = {
	'1': { name: 'Lot 1: Digital Outcomes', slug: 'lot-1' }
}

router.get('/DOS72ExistingServices.html', (req, res) => {
	const lot1Removed = Boolean(req.session.data.dos72Lot1Removed)
	const showLot1RemovedBanner = Boolean(req.session.data.dos72Lot1JustRemoved)
	const showLot1AddedBanner = Boolean(req.session.data.dos72Lot1JustAdded)
	req.session.data.dos72Lot1JustRemoved = false
	req.session.data.dos72Lot1JustAdded = false
	res.render('DOS72ExistingServices', { lot1Removed, showLot1RemovedBanner, showLot1AddedBanner })
})

router.get('/DOS72ExistingServices', (req, res) => {
	const lot1Removed = Boolean(req.session.data.dos72Lot1Removed)
	const showLot1RemovedBanner = Boolean(req.session.data.dos72Lot1JustRemoved)
	const showLot1AddedBanner = Boolean(req.session.data.dos72Lot1JustAdded)
	req.session.data.dos72Lot1JustRemoved = false
	req.session.data.dos72Lot1JustAdded = false
	res.render('DOS72ExistingServices', { lot1Removed, showLot1RemovedBanner, showLot1AddedBanner })
})

router.get('/DOS72ExistingAreYouSure.html', (req, res) => {
	const lot = req.query.lot || '1'
	res.render('DOS72ExistingAreYouSure', { lot, lotName: dos72Lots[lot].name, lotLabel: dos72Lots[lot].name })
})

router.get('/DOS72ExistingAreYouSure', (req, res) => {
	const lot = req.query.lot || '1'
	res.render('DOS72ExistingAreYouSure', { lot, lotName: dos72Lots[lot].name, lotLabel: dos72Lots[lot].name })
})

router.post('/DOS72ExistingAreYouSure', (req, res) => {
	const lot = req.body.lot

	if (lot === '1') {
		req.session.data.dos72Lot1Removed = true
		req.session.data.dos72Lot1JustRemoved = true
	}

	res.redirect('/DOS72ExistingServices')
})

router.get('/DOS72ExistingAddService.html', (req, res) => {
	res.render('DOS72ExistingAddService', { defaultLot: 'lot-1' })
})

router.get('/DOS72ExistingAddService', (req, res) => {
	res.render('DOS72ExistingAddService', { defaultLot: 'lot-1' })
})

router.post('/DOS72ExistingAddService', (req, res) => {
	const selectedLot = req.body['dos72-add-service-lot']

	if (selectedLot === 'lot-1') {
		req.session.data.dos72Lot1Removed = false
		req.session.data.dos72Lot1JustAdded = true
	}

	res.redirect('/DOS72ExistingServices')
})

router.get('/DOS72ReturningSupplierOptions.html', (req, res) => {
	res.render('DOS72ReturningSupplierOptions')
})

router.get('/DOS72ReturningSupplierOptions', (req, res) => {
	res.render('DOS72ReturningSupplierOptions')
})

router.post('/DOS72ReturningSupplierOptions', (req, res) => {
	const selectedOption = req.body['returning-supplier-option']

	if (selectedOption === 'option-1') {
		return res.redirect('/DOS72OptInOut')
	}

	if (selectedOption === 'option-2') {
		return res.redirect('/DOS72AddRemoveLots')
	}

	if (selectedOption === 'option-3') {
		return res.redirect('/DOS72NotOnFramework')
	}

	res.redirect('/DOS72ReturningSupplierOptions')
})

router.get('/DOS72NotOnFramework.html', (req, res) => {
	res.render('DOS72NotOnFramework')
})

router.get('/DOS72NotOnFramework', (req, res) => {
	res.render('DOS72NotOnFramework')
})

router.get('/DOS72AddRemoveLots.html', (req, res) => {
	const lot1Active = req.session.data.dos72Lot1Active !== false
	const lot2Active = req.session.data.dos72Lot2Active === true
	const showSaveContinue = Boolean(req.session.data.dos72ActionMade)

	res.render('DOS72AddRemoveLots', { lot1Active, lot2Active, showSaveContinue })
})

router.get('/DOS72AddRemoveLots', (req, res) => {
	const lot1Active = req.session.data.dos72Lot1Active !== false
	const lot2Active = req.session.data.dos72Lot2Active === true
	const showSaveContinue = Boolean(req.session.data.dos72ActionMade)

	res.render('DOS72AddRemoveLots', { lot1Active, lot2Active, showSaveContinue })
})

router.post('/DOS72AddRemoveLots', (req, res) => {
	res.redirect('/DOS72AddRemoveLots')
})

router.get('/DOS72AddLot.html', (req, res) => {
	res.render('DOS72AddLot')
})

router.get('/DOS72AddLot', (req, res) => {
	res.render('DOS72AddLot')
})

router.get('/DOS72LotServiceName.html', (req, res) => {
	res.render('DOS72LotServiceName')
})

router.get('/DOS72LotServiceName', (req, res) => {
	res.render('DOS72LotServiceName')
})

router.post('/DOS72LotServiceName', (req, res) => {
	req.session.data.dos72Lot2Active = true
	req.session.data.dos72ActionMade = true
	res.redirect('/DOS72AddRemoveLots')
})

router.get('/DOS72Lot1Add', (req, res) => {
	req.session.data.dos72Lot1Active = true
	req.session.data.dos72ActionMade = true
	res.redirect('/DOS72AddRemoveLots')
})

router.get('/DOS72LotRemoveAreYouSure.html', (req, res) => {
	res.render('DOS72LotRemoveAreYouSure')
})

router.get('/DOS72LotRemoveAreYouSure', (req, res) => {
	res.render('DOS72LotRemoveAreYouSure')
})

router.post('/DOS72LotRemoveAreYouSure', (req, res) => {
	req.session.data.dos72Lot1Active = false
	req.session.data.dos72ActionMade = true
	res.redirect('/DOS72AddRemoveLots')
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

router.post('/DOS72AreYouSure', (req, res) => {
	const confirmOptOut = req.body['dos72-opt-out-confirm']

	if (confirmOptOut === 'yes') {
		return res.redirect('/DOS72OptOutSuccess')
	}

	if (confirmOptOut === 'no') {
		return res.redirect('/DOS72OptOutNarrative')
	}

	res.redirect('/DOS72AreYouSure')
})

router.get('/DOS72OptOutSuccess.html', (req, res) => {
	res.render('DOS72OptOutSuccess')
})

router.get('/DOS72OptOutSuccess', (req, res) => {
	res.render('DOS72OptOutSuccess')
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
