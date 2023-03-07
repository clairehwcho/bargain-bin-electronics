const express = require('express');
const router = require('express').Router();
const { User } = require('../../models');

app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())

app.post("/auth/register", (req, res) => {    
  const { name, email, password, password_confirm } = req.body

  db.query('SELECT email FROM users WHERE email = ?', [email], async (error, res) => {
    
    if(error){
      console.log(error)
  }

  if( result.length > 0 ) {
    return res.render('register', {
        message: 'This email is already in use'
    })
} else if(password !== password_confirm) {
    return res.render('register', {
        message: 'Passwords do not match!'
    })
}
let hashedPassword = await bcrypt.hash(password, 8)

db.query('INSERT INTO users SET?', {name: name, email: email, password: hashedPassword}, (err, res) => {
    if(error) {
        console.log(error)
    } else {
        return res.render('register', {
            message: 'User registered!'
        })
    }
})

 })
})














// Get all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    const users = userData.map((user) => user.get({ plain: true }));

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one user
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    const user = userData.get({ plain: true });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.user_id = userData.id;
    req.session.logged_in = true;
    res.status(201).json(userData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({
      where: { email }
    });

    if (!userData) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }

    const validPassword = userData.checkPassword(password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }

    req.session.user_id = userData.id;
    req.session.logged_in = true;
    res.json({ user: userData, message: 'You are now logged in!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
