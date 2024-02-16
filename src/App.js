import React, { useState } from "react";
import './App.css';

const App = () => {
	const [password, setPassword] = useState("");
	let [passwordLength, setPasswordLength] = useState(12);
	const [useSymbols, setUseSymbols] = useState(true);
	const [useNumbers, setUseNumbers] = useState(true);
	const [useLowerCase, setUseLowerCase] = useState(true);
	const [useUpperCase, setUseUpperCase] = useState(true);
	const [successMessage, setSuccessMessage] = useState("");
  const [invalidInput, setInvalidInput] = useState('');

	const generatePassword = () => {
		let charset = "";
		let newPassword = "";
    let count = 0;
    let symbols = "!@#$%^&*();:,./~";
    let numbers = "0123456789";
    let lowercase = "abcdefghijklmnopqrstuvwxyz";
    let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		if (useSymbols) {charset += symbols;count+=1;}
		if (useNumbers) {charset += numbers;count+=1;}
		if (useLowerCase) {charset += lowercase;count+=1;}
		if (useUpperCase) {charset += uppercase;count+=1;}

    if(count<=passwordLength)
    {
      setInvalidInput('');
      if(useSymbols) {
        newPassword +=symbols.charAt(Math.floor(Math.random()*symbols.length))}
      if(useNumbers) {
        newPassword +=numbers.charAt(Math.floor(Math.random()*numbers.length))}
      if(useLowerCase) {
        newPassword +=lowercase.charAt(Math.floor(Math.random()*lowercase.length))}
      if(useUpperCase) {
        newPassword +=uppercase.charAt(Math.floor(Math.random()*uppercase.length))}
      
      passwordLength-=count;
		  for (let i = 0; i < passwordLength; i++) {
			newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
		}
    let charArray = newPassword.split('');
  for (let i = newPassword.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [charArray[i], charArray[j]] = [charArray[j], charArray[i]];
  }
    newPassword = charArray.join('');
    }
    else setInvalidInput("Invalid Input: Password length less than selected checkboxes");

		setPassword(newPassword);
	};

	const copyToClipboard = () => {
    const obj = JSON.parse(JSON.stringify({password}));
		navigator.clipboard.writeText(obj['password']);
        setSuccessMessage("Password copied to clipboard!");
		    setTimeout(() => setSuccessMessage(""), 2000);
	};

	return (
    <div>
    <center>
		<div className="container">
			<h1
				style={{
					color: "blue",
					textAlign: "center",
				}}
			>
				Password  Generator
			</h1>
			<div className="inputContainer">
				<label className="label">Password Length:</label>
				<input
					type="number"
					value={passwordLength}
					onChange={(e) => setPasswordLength(e.target.value)}
					className="input"
				/>
			</div>
			<div className="checkboxContainer">
				<label>
					<input
						type="checkbox"
						checked={useSymbols}
						onChange={() => setUseSymbols(!useSymbols)}
					/>
					Symbols
				</label>
				<label>
					<input
						type="checkbox"
						checked={useNumbers}
						onChange={() => setUseNumbers(!useNumbers)}
					/>
					Numbers
				</label>
				<label>
					<input
						type="checkbox"
						checked={useLowerCase}
						onChange={() => setUseLowerCase(!useLowerCase)}
					/>
					LowerCase
				</label>
				<label>
					<input
						type="checkbox"
						checked={useUpperCase}
						onChange={() => setUseUpperCase(!useUpperCase)}
					/>
					UpperCase
				</label>
			</div>
			<button className="button" onClick={generatePassword}>
				Generate Password
			</button>
      <p>{invalidInput}</p>
			{password && (
				<div className="inputContainer">
					<label className="label">Generated Password:</label>
					<input type="text" value={password} readOnly className="input" />
					<button
						className=
							"button copyButton"
						onClick={copyToClipboard}
					>
						Copy
					</button>
				</div>
			)}
			{successMessage && (
				<p
					style={{
						color: "blue",
						textAlign: "center",
					}}
				>
					{successMessage}
				</p>
			)}
		</div>
    </center>
    </div>
	);
};

export default App;