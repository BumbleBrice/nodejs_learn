import Customer from '../models/Customer.js';
import mongoose from 'mongoose';

export const homepage = async (req, res) => {
	const messages = await req.flash("info");

	const meta = {
		title: "Accueil",
		description: "Meta description",
	}

	let perPage = 12;
	let page = req.query.page || 1;


	try {
		/*const customers = await Customer.find({})*/
		const customers = await Customer.aggregate([{ $sort: {createAt: -1 }}])
		.skip(perPage * page - perPage)
		.limit(perPage)
		.exec()

		const count = await Customer.countDocuments({})


		res.render('index', {
			meta,
			customers,
			current: page, 
			pages: Math.ceil(count / perPage),
			messages,
		})
	} catch (error) {
		console.log(error)
		res.status(500).send('il y a une erreur lors de la recupération des données')
	}
};

export const addCustomer = async (req, res) => {
		const meta = {
		title: "Ajouter un utilisateur",
		description: "Formulaire utilisatueur",
	}
	res.render("customer/add", {meta})
}

export const postCustomer = async (req, res) => {
	console.log(req.body)
	const newCustomer = new Customer({
		firstName: req.body.firstName,
    lastName: req.body.lastName,
    details: req.body.details,
    tel: req.body.tel,
    email: req.body.email,
	})
	try {
		await Customer.create(newCustomer)
		await req.flash("info", "Nouvel utiilsateur créer.");
		res.redirect('/')


	} catch (error) {
		conole.log(error)
	}

}
export const view = async (req, res) => {
	const meta = {
		title: "Utililsatuer",
		description: " utilisatueur",
	}
	try {
		const customer = await Customer.findOne({ _id: req.params.id })
		res.render("customer/view", {meta, customer})

	} catch (error) {
		console.log(error)
	}
}


export const deleteCustomer = async (req, res) => {
	try {
		const userId = req.params.userId
		await Customer.findByIdAndDelete(userId)
		await req.flash("info", "Utilisateur supprimer.");
		res.redirect('/')
	} catch (error) {
		conole.log(error)
	}
}

export const searchCustomers = async (req, res) => {
		const meta = {
		title: "Utililsatuer",
		description: " utilisatueur",
	}
	try {
		let searchTerm = req.body.searchTerm
		const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

		const customers = await Customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });
    res.render("search", {customers, meta})
	} catch (error) {
		console.log(error)
	}
}

