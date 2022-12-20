const { User } = require('../db');
const { encript } = require('../controllers/encript_controller')

const getUsers = async () => {

    const result = await User.findAll();
    return result;
}

const generateUser = async (params) => {

    try {
        const { name, email, picture } = params;
        const newUser = await User.findOrCreate({
            where: { email: email },
            defaults: {
                name: name,
                picture: picture
            }
        })
        return newUser[0];

    } catch (error) {
        console.log(error.message);
        //return res.status(404).json(error)
        res.status(404).json({ msg: 'error en solicitud' })
    }
}

const updateUser = async (data) => {
    try {
        const { name, first_name, last_name, email, password, phone_number, address, wallet, userType, status } = data;
        //console.log(email + '*****');
        const user = await User.findOne({ where: { email: email } });
        if (user) {
            user.first_name = first_name;
            user.last_name = last_name;
            user.password = password;
            user.phone_number = phone_number;
            user.address = address;
            user.userType = userType;
            user.wallet = wallet;
            user.status = status;
            await user.save();
            return user;
        }
        //res.status(404).json({msg: 'el mail no existe'})
    } catch (error) {
        res.status(404).json({ msg: 'error actualizando' })
    }
}

const findUserBbdd = async (email) => {
    if (!email) return ({ msg: 'no escribieron el email' })
    const user = await User.findOne({ where: { email: email } });
    if (user) return user;
    return [{msg: 'error'}]
}

const loadUser = async () => {
    await User.create({
        name: 'Cristian',
        first_name: "Rafael",
        last_name: "Ganon",
        email: 'crgs2008@gmail.com',
        password: 'admin',
        userType: 'admin',
        wallet: 20000,
        address: 'Palo alto - California',
        phone_number: '+542665444444'
    });

    await User.create({
        name: 'Sandra',
        first_name: "Noemi",
        last_name: "Garay",
        email: 'san2015@gmail.com',
        password: 'admin',
        userType: 'admin',
        wallet: 50000,
        address: 'Bs As - Argentina',
        phone_number: '+549988877777'
    });

}

module.exports = { getUsers, generateUser, updateUser, findUserBbdd, loadUser }

/* const generateUser = async (params) => {

    try {
        const { first_name, last_name, email, password, phone_number, address, userType } = params;
        if (!first_name || !last_name || !email || !password) throw new Error('Faltan datos para crear la receta');
        const existUser = await User.findAll({ where: { email: email } })
        if (existUser.length) throw new Error('El mail ya esta registrado')
        const passwordEncript = await encript(password);
   
        console.log(passwordEncript);
        const newUser = await User.create({ first_name, last_name, email, password: passwordEncript, phone_number, address, userType});
        return newUser;

    } catch (error) {
        console.log(error.message);
        return res.status(404).json(error)
    }
}
 */