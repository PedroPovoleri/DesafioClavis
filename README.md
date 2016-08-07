# DesafioClavis
Desafio clavis 2016

#Crie uma aplicação web para tratar o seguinte problema:

A aplicação deverá receber uma lista de CVEs (Common Vulnerabilities and Exposures) e deverá mapear seus respectivos
 CVSS (Common Vulnerability Scoring System) de acordo com o site https://web.nvd.nist.gov/view/vuln/detail?vulnId=*, onde o * corresponde a notação do CVE: prefixo (CVE) + ano + digitos_arbitrários, na qual os digitos arbitrários começam com 4 caracteres. Exemplo: https://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2013-5568.

*Os dados dos CVSS a serem mapeados a partir do site 'web.nvd.nist.gov' são: CVSS Base Score (v2 ou v3) e os valores de impacto e exploitabilidade.

#cvss

![alt tag](https://googledrive.com/host/0B1qbzErX4WLNa2cySDVqTFQ5Vzg/cvss.png)

A partir dos dados, utilizar a API Chart do Google para gerar um gráfico de pizza de acordo com a classificação: None (0), Low (0.1-3.9), Medium (4.0-6.9), High (7.0-8.9), and Critical (9.0-10.0).

![alt tag](https://googledrive.com/host/0B1qbzErX4WLNa2cySDVqTFQ5Vzg/Captura de Tela 2016-07-29 às 17.11.20.png)

E também gerar dois gráficos de barra mostrando os valores de impacto e exploitabilidade para cada uma das CVEs.

![alt tag](https://googledrive.com/host/0B1qbzErX4WLNa2cySDVqTFQ5Vzg/Captura de Tela 2016-07-29 às 17.23.09.png)

Observação: Dependendo da CVE, pode ter as duas classificações CVSS v2 e v3, neste caso
tratar de forma diferenciada a versão. Ou seja, gerar dois gráficos de pizza, um para versão v2 e outro para versão v3. Isso também se aplica aos gráficos de barra.

Além das informações anteriores, uma tabela contendo as informações, separadas por CVE também deve ser disponibilizada.
A solução deve conter instruções de setup e uso, caso necessário.
