const fs = require("fs")
const path = require("path")
const utils = require("util")
const puppeteer = require("puppeteer")
const hb = require("handlebars")
const readFile = utils.promisify(fs.readFile)

async function getTemplateHtml(htmlFile) {
  console.log("Loading template file in memory")
  try {
    const invoicePath = path.resolve(htmlFile);
    return await readFile(invoicePath, "utf8");
  } catch (err) {
    return Promise.reject("Could not load html template");
  }
}

async function generatePdf(htmlFile) {
  let data = {
      cedula_numero: "12345",
      vencimento: "27/03/2026",
      valor_emprestimo: "29.800,00",
      prazo: "72",
      valor_parcelas: "894,33",
      linha: "CONSIG",
      orgao: "GOVGO",
      convenio: "GOVERNO DE GOIÁS",
      nome: "DIOGO DANIEL PIRES HITACARAMBI",
      cpf: "695.765.051-00",
      saldo_devedor: "0,00",
      empresa_nome: "RBCB - REDE B. DE C. E BUSINESS",
      empresa_cnpj: "06.939.746/0001-41",
      taxa_jurosm: "1.89",
      taxa_jurosa: "26,46",
      saldo_devedor: "0,00",
      saldo_devedor_p: "0,00",
      f1: "X",
      f2: "",
      f3: "",
      banco: "237",
      agencia: "0140",
      conta: "226.218-5",
      matricula: "04497984654",
      lotacao: "GABINETE DA DEPUTADA",
      endereco: "RUA PIRAPORA QD 03 LT 07",
      cidade: "GOIÂNIA",
      uf: "GO",
      cep: "74.315-270",
      telefone: "(62) 3626-8740",
      celular: "(62) 98227-0001",
      email: "diogops@gmail.com",
      prazo: 72,
      primeiro_vencimento: "01/04/2020",
      ultimo_vencimento: "01/04/2026",
      valor_juros: "28.587,40",
      valor_iof: "4.541,33",
      seguro: "2.134,44",
      total_encargos: "0,00",
      valor_liquido: "26.985,00",
      valor_juros_p: "43,00",
      valor_iof_p: "3,00",
      seguro_p: "1,00",
      total_encargos_p: "7,58",
      valor_liquido_p: "59,55",
      saldo_devedor: "0,00",
      saldo_devedor_p: "0,00",
      total_a_pagar: "69.895,41",
      custo_efetivom: "3,54",
      custo_efetivoa: "42,48",
      cidade: "GOIÂNIA",
      dia: "27",
      mes_extenso: "MARÇO",
      ano: "2020"
  }

  getTemplateHtml(htmlFile).then(async (res) => {
    // Now we have the html code of our template in res object
    // you can check by logging it on console
    // console.log(res)
    console.log("Compiing the template with handlebars")
    const template = hb.compile(res, {
      strict: true
    });
    // we have compile our code with handlebars
    const result = template(data);
    // We can use this to add dyamic data to our handlebas template at run time from database or API as per need. you can read the official doc to learn more https://handlebarsjs.com/
    let html = result;
    // html = html.replace(/{cedula_numero}/gi, "123456")
    // html = html.replace(/{vencimento}/gi, "27/03/2026")
    // html = html.replace(/{valor_emprestimo}/gi, "29.800,00")
    // html = html.replace(/{prazo}/gi, "72")
    // html = html.replace(/{valor_parcelas}/gi, "894,33")
    
    // we are using headless mode
    const browser = await puppeteer.launch();
    const page = await browser.newPage()
    // We set the page content as the generated html by handlebars
    await page.setContent(html)
    // We use pdf function to generate the pdf in the same folder as this file.
    await page.pdf({
      path: htmlFile.replace(/.\w+$/, "") + ".pdf",
      format: "A4"
    })
    await browser.close();
    console.log("PDF Generated")
  }).catch(err => {
    console.error(err)
  });
}

generatePdf("CCB_Nova.html");
