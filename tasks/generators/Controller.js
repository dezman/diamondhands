import chalk from "chalk";
import inquirer from "inquirer";
import cli from "clui";


const formatInput = (input) => {
  const controller = "Controller";
  let str = input.trim().toLowerCase();
  str = str.charAt(0).toUpperCase() + str.slice(1) ;
  return str + controller;
}

const createFile = (input) => {
  console.log("sdfa");
}

const generateController = () => {
  console.log(
    chalk.green("Give me a controller name Daimondhand :")
  );

  let input , formattedInput;
  let bar = new cli.Progress(50);

  inquirer.prompt([ { name:"controller", message: "Give me name" } ])
          .then((res) => { input = res.controller })
          .then(() => formattedInput = formatInput(input))
          .then(() => console.log("We will Create the Controller: ", formattedInput))
          .then(() => createFile(formattedInput))
          .then(() => console.log(chalk.green(bar.update(1)))) // have to add a proper updater based on progress state.
          .catch(err => console.error(err));
};

generateController();