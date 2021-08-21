const SerialPort = require('serialport');

const form = document.getElementById('form');
const select = document.getElementById('serialPortList');
const searchButton = document.getElementById('searchButton');
const connectButton = document.getElementById('connectButton');
const log = document.getElementById('log');

const portSearch = () => {
    select.replaceChildren();
    SerialPort.list().then((ports) => {
        ports.forEach((port, index) => {
            if (port.pnpId && port.manufacturer) {
                const option = document.createElement("OPTION");
                option.value = port.path
                option.textContent = port.path
                select.appendChild(option)
            }
        });
        if (select.value) {
            log.classList.add('green')
            log.classList.remove('red')
            log.textContent = 'Porta serial encontrada';
        } else {
            log.classList.remove('green')
            log.classList.add('red')
            log.textContent = 'Nenhuma porta serial foi encontrada';
        }
    });
};

const portConnect = () => {
    if (select.value) {
        if (!this.serialPort || !this.serialPort.isOpen) {
            this.serialPort = new SerialPort(select.value, { baudRate: 115200 });

            this.serialPort.on('open', function () {
                log.classList.add('green')
                log.classList.remove('red')
                log.textContent = 'Conexão aberta com a porta serial';
            });

            this.serialPort.on('error', function (err) {
                log.classList.remove('green')
                log.classList.add('red')
                log.textContent = err;
            });

            this.serialPort.on('data', function (dataReceived) {
                log.classList.add('green')
                log.classList.remove('red')
                log.textContent = 'Dado recebido: ' + dataReceived;
            })

            this.serialPort.on('close', function () {
                log.classList.remove('green')
                log.classList.add('red')
                log.textContent = 'Conexão fechada';
                select.replaceChildren();
            });
        } else {
            log.classList.add('green')
            log.classList.remove('red')
            log.textContent = `Já está conectado`;
        }
    } else {
        log.classList.remove('green')
        log.classList.add('red')
        log.textContent = `A porta serial não foi selecionada`;
    }
}

searchButton.addEventListener("click", portSearch);
connectButton.addEventListener("click", portConnect);

const sendMessage = (data) => {
    this.serialPort.write(data, function (err) {
        if (err) {
            log.textContent = err;
        } else {
            log.classList.add('green')
            log.classList.remove('red')
            log.textContent = `Mensagem enviada com sucesso`;
        }
    })
}

const logSubmit = (event) => {
    event.preventDefault();
    if (this.serialPort.isOpen) {
        let data = "";
        for (let index = 0; index < 52; index++) {
            data += document.getElementById(`bit${index}`).value
        }
        sendMessage(data)
    } else {
        log.classList.remove('green')
        log.classList.add('red')
        log.textContent = `Sem conexão aberta, por favor abra uma conexão`;
    }
}

form.addEventListener('submit', logSubmit);

