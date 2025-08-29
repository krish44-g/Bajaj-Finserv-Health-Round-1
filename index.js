const express = require('express');
const app = express();
const PORT = 3000;

const FULL_NAME = "john_doe";
const DOB = "17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

app.use(express.json());

function alternateCaps(str) {
    return str.split('').reverse().map((char, idx) => 
        idx % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
    ).join('');
}

function processData(arr) {
    let even_numbers = [];
    let odd_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let numbers_sum = 0;
    let concat_chars = [];

    arr.forEach(item => {
        const itemStr = item.toString();
        if (/^\d+$/.test(itemStr)) {
            const num = parseInt(itemStr);
            if (num % 2 === 0) {
                even_numbers.push(itemStr);
            } else {
                odd_numbers.push(itemStr);
            }
            numbers_sum += num;
        }
        else if (/^[a-zA-Z]+$/.test(itemStr)) {
            alphabets.push(itemStr.toUpperCase());
            concat_chars.push(itemStr);
        }
        else {
            if (/^[\W_]+$/.test(itemStr)) {
                special_characters.push(itemStr);
            } else {
                const nums = itemStr.match(/\d+/g);
                const letters = itemStr.match(/[a-zA-Z]+/g);
                if (nums) {
                    nums.forEach(val => {
                        if (parseInt(val) % 2 === 0) {
                            even_numbers.push(val);
                        } else {
                            odd_numbers.push(val);
                        }
                        numbers_sum += parseInt(val);
                    });
                }
                if (letters) {
                    letters.forEach(val => {
                        alphabets.push(val.toUpperCase());
                        concat_chars.push(val);
                    });
                }
                if (!nums && !letters) {
                    special_characters.push(itemStr);
                }
            }
        }
    });
    let concat = concat_chars.reverse().join('');
    let concat_string = alternateCaps(concat);

    return {
        is_success: true,
        user_id: `${FULL_NAME}_${DOB}`,
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        odd_numbers,
        even_numbers,
        alphabets,
        special_characters,
        sum: numbers_sum.toString(),
        concat_string
    };
}

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        if (!Array.isArray(data)) {
            throw new Error("Invalid input, data must be an array.");
        }
        const response = processData(data);
        res.status(200).json(response);
    } catch (e) {
        res.status(400).json({
            is_success: false,
            user_id: `${FULL_NAME}_${DOB}`,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            odd_numbers: [],
            even_numbers: [],
            alphabets: [],
            special_characters: [],
            sum: "0",
            concat_string: "",
            error: e.message
        });
    }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


