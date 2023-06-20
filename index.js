const express = require('express');
const app = express();

app.use(express.json());

const studentsObj = [
    {
        id: 1, name: 'John', age:20, enroll: true,
    },
    {
        id: 2, name: 'Kevin', age:22, enroll: false,
    },
    {
        id: 3, name: 'Enrique', age:49, enroll: false,
    },
    {
        id: 4, name: 'Nanardo', age:30, enroll: true,
    }
];

app.get('/', (req, res) => {
    res.send('Welcome to the University made in Node JS API');
});

app.get('/api/students', (req, res) => {
    res.send(studentsObj);
});

app.get('/api/students/:id', (req, res) => {
    const students = studentsObj.find(c => c.id === parseInt(req.params.id));
    if (!students) return res.status(404).send("El estudiante no fue encontrado");
    else res.send(students);
});

app.post('/api/students', (req, res) => {
    const students = {
        id: studentsObj.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll || 'true')
    };
    studentsObj.push(students);
    res.send(students);
});

app.delete('/api/students/:id', (req, res) => {
    const students = studentsObj.find(c => c.id === parseInt(req.params.id));
    if (!students) return res.status(404).send("El estudiante no fue encontrado");
    
    const index = studentsObj.indexOf(students);
    studentsObj.splice(index, 1);
    res.send(students);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
