# Chamada por QR Code 

Chamada por QR Code é uma aplicação web projetada para facilitar o registro de presença de participantes utilizando tecnologia de leitura de QR Code. A aplicação é intuitiva e eficiente, permitindo o registro de presença de forma digital e segura, armazenando todos os dados em um banco de dados centralizado.

# Funcionalidades 
## Leitura de QR Code:
* Registro de Presença: Os participantes escaneiam um QR Code exclusivo e informam seu nome completo e data de nascimento, que são salvos automaticamente no Firestore.
* Página Inicial: A tela principal é a de leitura do QR Code, facilitando o uso rápido da aplicação.
* Calendário Interativo: Um calendário na parte superior da tela permite a seleção de dias específicos para visualizar as presenças registradas naquele dia.

## Gerenciamento de Presenças:
* Consulta de Presenças: Visualiza a lista de presenças registradas com base na data selecionada.
* Filtragem por Data: Exibe as presenças de um dia específico, facilitando o gerenciamento e acompanhamento de presença.
* Detalhes do Participante: Apresenta informações detalhadas dos participantes, incluindo nome, matrícula e horário de registro.

## Tecnologias Utilizadas
* React: Biblioteca JavaScript para construção de interfaces de usuário, permitindo a criação de componentes reutilizáveis e gerenciamento eficiente de estados.
* Next.js: Framework React que facilita a renderização do lado do servidor e a geração de sites estáticos, melhorando o desempenho e SEO.
* TypeScript: Superset do JavaScript que adiciona tipagem estática, ajudando a evitar erros e melhorar a manutenção do código.
* Tailwind CSS: Framework de utilitários para estilização de componentes, permitindo a criação de layouts responsivos e estilos personalizados de forma rápida.
* Firebase: Banco de dados NoSQL em tempo real utilizado para armazenar e sincronizar dados de presença de maneira eficiente e segura.
* React-Calendar: Biblioteca para adicionar um calendário interativo à interface, permitindo a seleção de datas para visualização de presenças.
* QRCode Scanner: Utilizado para leitura do QR Code, possibilitando a captura rápida e fácil de informações do participante.