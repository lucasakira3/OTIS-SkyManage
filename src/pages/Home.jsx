import React, { useState, useMemo, useRef, useCallback } from "react";
import { Modal, Button, Form, ProgressBar, Card, Badge } from "react-bootstrap";
import Timeline from "../components/Timeline";
import { PEDIDOS } from "../data/mockPedidos";
import { PieChart } from "@mui/x-charts";
import "../css/Home.css";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';





const funcionariosMock = [
  { id: 1, nome: "Teresa de Cassia", cargo: "Supervisor", distancia: "0.5 km", online: true },
  { id: 2, nome: "Pedro Romano", cargo: "Instalador", distancia: "1.2 km", online: true },
  { id: 3, nome: "Bento Silva de Souza", cargo: "Técnico", distancia: "0.8 km", online: false },
  { id: 4, nome: "Carlo Silveira", cargo: "Vendedor Externo", distancia: "2.1 km", online: true },
  { id: 5, nome: "José Smith", cargo: "Engenheiro de Campo", distancia: "1.5 km", online: true },
];

const paisesInfo = {
  Brasil: {
    funcionarios: 2500,
    contratos: 1200,
    estoques: 300,
    marketShare: "28%",
    totalInstallations: "25000",
    annualGrowth: "10%",
    keyProjects: "Arranha-céus em São Paulo e Rio de Janeiro, modernização de metrôs e edifícios comerciais",
    detalhes: "Maior mercado da América Latina com forte demanda por elevadores de alta velocidade e tecnologia avançada, impulsionado pela urbanização acelerada e projetos de infraestrutura em grandes centros urbanos."
  },
  Argentina: {
    funcionarios: 1500,
    contratos: 800,
    estoques: 200,
    marketShare: "15%",
    totalInstallations: "12000",
    annualGrowth: "7%",
    keyProjects: "Projetos de infraestrutura em Buenos Aires e Córdoba, incluindo shoppings e prédios corporativos",
    detalhes: "Mercado em crescimento acelerado, impulsionado por projetos de infraestrutura em Buenos Aires e Córdoba. Ênfase em contratos de manutenção preventiva para prédios corporativos e shoppings, com foco em eficiência energética."
  },
  Chile: {
    funcionarios: 1200,
    contratos: 700,
    estoques: 150,
    marketShare: "12%",
    totalInstallations: "9000",
    annualGrowth: "6%",
    keyProjects: "Edifícios sísmicos-resistentes em Santiago e Valparaíso, arranha-céus de alta velocidade",
    detalhes: "Foco em projetos de infraestrutura sísmica-resistente, com forte presença em Santiago e Valparaíso. Alta taxa de contratos para elevadores de alta velocidade em arranha-céus e instalações industriais."
  },
  Colombia: {
    funcionarios: 1800,
    contratos: 950,
    estoques: 250,
    marketShare: "18%",
    totalInstallations: "15000",
    annualGrowth: "9%",
    keyProjects: "Modernização em Bogotá e Medellín, edifícios históricos e desenvolvimentos urbanos novos",
    detalhes: "Expansão contínua em Bogotá e Medellín, com ênfase em modernização de elevadores em edifícios históricos e novos desenvolvimentos urbanos. Grande volume de serviços de emergência e parcerias com construtoras locais."
  },
  Haiti: {
    funcionarios: 500,
    contratos: 250,
    estoques: 50,
    marketShare: "3%",
    totalInstallations: "2000",
    annualGrowth: "4%",
    keyProjects: "Reconstrução em Porto Príncipe, elevadores acessíveis em edifícios públicos",
    detalhes: "Mercado emergente com foco em reconstrução pós-desastres, priorizando elevadores acessíveis em Porto Príncipe. Ênfase em parcerias locais para manutenção básica e projetos sustentáveis."
  },
  Venezuela: {
    funcionarios: 900,
    contratos: 450,
    estoques: 100,
    marketShare: "8%",
    totalInstallations: "6000",
    annualGrowth: "5%",
    keyProjects: "Manutenção em Caracas para instalações petrolíferas e comerciais",
    detalhes: "Desafios econômicos, mas oportunidades em Caracas para manutenção de elevadores em instalações petrolíferas e comerciais. Foco em eficiência operacional, redução de custos e adaptações a condições adversas."
  },
  Panamá: {
    funcionarios: 700,
    contratos: 350,
    estoques: 80,
    marketShare: "6%",
    totalInstallations: "4000",
    annualGrowth: "7%",
    keyProjects: "Torres de escritórios e hotéis na Cidade do Panamá, expansão relacionada ao Canal",
    detalhes: "Hub logístico com demanda por elevadores em torres de escritórios e hotéis na Cidade do Panamá. Contratos crescentes relacionados ao Canal do Panamá e zona franca, com ênfase em logística integrada."
  },
  Paraguai: {
    funcionarios: 600,
    contratos: 300,
    estoques: 60,
    marketShare: "4%",
    totalInstallations: "3000",
    annualGrowth: "5%",
    keyProjects: "Projetos hidrelétricos em Assunção, elevadores industriais em áreas rurais",
    detalhes: "Crescimento em Assunção com projetos hidrelétricos, demandando elevadores industriais. Ênfase em estoques regionais para suporte rápido em áreas rurais e parcerias com setores energéticos."
  },
  Peru: {
    funcionarios: 1300,
    contratos: 650,
    estoques: 140,
    marketShare: "11%",
    totalInstallations: "8000",
    annualGrowth: "8%",
    keyProjects: "Elevadores para mineração em Lima e Cusco, sistemas de alta altitude",
    detalhes: "Expansão em Lima e Cusco, com foco em elevadores para mineração e turismo. Alta demanda por sistemas resistentes a altitudes elevadas e condições ambientais extremas."
  },
  México: {
    funcionarios: 2200,
    contratos: 1100,
    estoques: 280,
    marketShare: "22%",
    totalInstallations: "20000",
    annualGrowth: "9%",
    keyProjects: "Fábricas automotivas e arranha-céus na Cidade do México e Monterrey",
    detalhes: "Segundo maior mercado, com forte presença na Cidade do México e Monterrey. Ênfase em contratos para fábricas automotivas e arranha-céus, incluindo modernizações sísmicas e tecnologias de ponta."
  },
  Nicarágua: {
    funcionarios: 500,
    contratos: 250,
    estoques: 50,
    marketShare: "3%",
    totalInstallations: "2000",
    annualGrowth: "4%",
    keyProjects: "Infraestrutura básica em Manágua, hotéis e residências emergentes",
    detalhes: "Desenvolvimento em Manágua com projetos de infraestrutura básica. Oportunidades em elevadores para hotéis e residências emergentes, com foco em acessibilidade e custos baixos."
  },
  Honduras: {
    funcionarios: 600,
    contratos: 300,
    estoques: 60,
    marketShare: "4%",
    totalInstallations: "2500",
    annualGrowth: "5%",
    keyProjects: "Zonas industriais em Tegucigalpa e San Pedro Sula",
    detalhes: "Foco em Tegucigalpa e San Pedro Sula, com contratos para zonas industriais e exportação. Ênfase em manutenção acessível para PMEs e integração com cadeias de suprimentos regionais."
  },
  "El Salvador": {
    funcionarios: 550,
    contratos: 280,
    estoques: 55,
    marketShare: "3.5%",
    totalInstallations: "2200",
    annualGrowth: "6%",
    keyProjects: "Call centers e turismo em San Salvador, edifícios de médio porte",
    detalhes: "Crescimento em San Salvador impulsionado por call centers e turismo. Demanda por elevadores eficientes em edifícios de médio porte, com ênfase em sustentabilidade e rápida instalação."
  },
  Guatemala: {
    funcionarios: 700,
    contratos: 350,
    estoques: 70,
    marketShare: "5%",
    totalInstallations: "3500",
    annualGrowth: "5%",
    keyProjects: "Shoppings e hospitais na Cidade da Guatemala",
    detalhes: "Presença em Cidade da Guatemala com projetos em zonas comerciais. Foco em elevadores para shoppings e hospitais, priorizando segurança e conformidade com normas locais."
  },
  Equador: {
    funcionarios: 900,
    contratos: 450,
    estoques: 90,
    marketShare: "7%",
    totalInstallations: "5000",
    annualGrowth: "6%",
    keyProjects: "Extração de petróleo e turismo andino em Quito e Guayaquil",
    detalhes: "Expansão em Quito e Guayaquil, com ênfase em elevadores para extração de petróleo e turismo andino. Contratos para sistemas de alta capacidade adaptados a terrenos variados."
  },
  "Costa Rica": {
    funcionarios: 650,
    contratos: 320,
    estoques: 65,
    marketShare: "4.5%",
    totalInstallations: "2800",
    annualGrowth: "7%",
    keyProjects: "Ecoturismo e parques empresariais em San José",
    detalhes: "Mercado estável em San José, focado em ecoturismo e tecnologia. Alta demanda por elevadores sustentáveis em hotéis e parques empresariais, com tecnologias ecológicas."
  },
  Cuba: {
    funcionarios: 800,
    contratos: 400,
    estoques: 85,
    marketShare: "5%",
    totalInstallations: "4000",
    annualGrowth: "4%",
    keyProjects: "Modernização em Havana de hotéis e residências históricas",
    detalhes: "Oportunidades em Havana para modernização de elevadores em hotéis e residências históricas. Ênfase em parcerias governamentais e preservação arquitetônica."
  },
  Bolivia: {
    funcionarios: 750,
    contratos: 380,
    estoques: 75,
    marketShare: "5%",
    totalInstallations: "3500",
    annualGrowth: "5%",
    keyProjects: "Mineração e agricultura em La Paz e Santa Cruz",
    detalhes: "Foco em La Paz e Santa Cruz, com elevadores para mineração e agricultura. Desafios logísticos, mas crescimento em estoques regionais e adaptações a altitudes."
  },
  Uruguai: {
    funcionarios: 650,
    contratos: 320,
    estoques: 65,
    marketShare: "4%",
    totalInstallations: "3000",
    annualGrowth: "6%",
    keyProjects: "Portos e residências de luxo em Montevidéu",
    detalhes: "Mercado maduro em Montevidéu, com contratos para portos e residências de luxo. Ênfase em manutenção preventiva de alta qualidade e integração com turismo."
  },
  "República Dominicana": {
    funcionarios: 950,
    contratos: 480,
    estoques: 95,
    marketShare: "6.5%",
    totalInstallations: "4500",
    annualGrowth: "8%",
    keyProjects: "Resorts em Punta Cana e Santo Domingo, sistemas de grande fluxo",
    detalhes: "Turismo em Punta Cana e Santo Domingo impulsionando demanda por elevadores em resorts. Foco em sistemas de grande fluxo, alta durabilidade e design luxuoso."
  },
};

// Coordenadas simplificadas para o mapa da América Latina
const mapaPaises = [
  { 
    id: "brasil", 
    nome: "Brasil", 
    d: "M342.514118,454.255863L337.640252,455.908437L336.278891,455.770811L333.661657,451.781207L334.872241,448.437326L332.998355,444.859896L331.556446,444.983021L331.923642,445.768702L330.909340,446.830762L325.812677,448.303425L325.012070,448.960573L320.233729,448.165852L321.475056,448.886528L322.266633,454.109736L318.739794,456.387813L316.046598,457.416436L314.519627,455.949294L313.996209,456.291195L311.767668,454.731067L306.363791,454.669052L306.398117,456.405015L308.023265,456.691853L305.812998,457.924120L305.798880,459.939274L307.397943,463.742613L306.151170,471.357892L303.651891,471.227391L297.835456,474.075360L297.202825,477.854921L295.526368,478.661157L294.797638,480.353193L297.493056,484.582584L296.906933,485.789145L298.747640,485.952187L299.796411,487.453427L302.243950,487.526210L304.519645,485.867611L304.334399,490.149067L305.596149,490.473567L307.160599,489.986865L309.222741,490.226019L310.650818,490.164253L315.155913,487.109100L318.784941,486.632406L318.607865,491.724725L321.619669,494.264616L324.725566,494.733588L328.839459,497.188301L332.195097,498.006661L332.894445,501.733293L332.085096,501.781239L333.151711,505.135434L338.468949,505.254732L340.529228,510.698722L339.543447,515.968907L338.676482,516.579280L339.496652,518.225077L339.312266,522.269282L342.240083,522.844304L343.372197,522.257681L347.381033,528.029741L348.421277,527.539143L349.042227,531.570489L348.497669,533.343008L349.871212,532.753500L351.262670,534.532232L351.206129,537.007741L343.878130,543.062123L340.177655,547.408825L341.977944,547.066844L344.759141,549.556233L345.790140,549.461891L352.424094,555.576556L351.201112,557.144575L351.969041,559.028012L353.803871,557.126591L355.068631,553.990760L359.393066,549.884064L362.470370,544.241282L365.556130,537.793871L365.498657,533.767444L367.846371,530.722692L371.110426,528.296072L374.216609,527.409580L376.170040,526.063347L380.533029,524.904173L383.546195,524.911333L384.195523,523.109714L386.440402,521.811991L386.911938,518.734916L389.724021,514.875743L390.215764,510.955985L392.160596,503.429895L391.963740,498.056393L395.485133,493.439133L397.252099,490.238285L402.572491,484.480277L403.676943,479.848031L402.275237,474.605692L401.270108,473.727077L396.761932,472.812363L393.219829,469.696587L389.119839,467.397455L384.976279,467.505659L379.578708,466.037168L376.353709,466.892790L376.808475,465.356136L375.454783,463.729996L367.358282,461.038881L365.251710,462.859045L365.151670,460.078873L360.249139,459.643310L359.386473,458.807301L361.472550,456.523995L361.397735,454.608900L359.914478,454.150821L357.672752,447.756962L356.727962,447.888381L353.172745,453.531137L351.844779,453.729485L349.987662,453.584705L348.776505,453.012131L347.187761,452.423908L345.878213,452.707738L344.758926,452.461064L344.696867,454.383630L343.188958,454.156486L342.514118,454.255863Z ",
  },
    { 
    id: "argentina", 
    nome: "Argentina", 
    d: "M309.644719,631.735724L309.646550,642.213875L312.616701,642.216334L314.287780,642.345548L315.702035,644.056515L318.336844,643.813379L319.584911,641.398638L315.702035,640.202418L312.096507,637.360988L310.709765,633.865903L309.644719,631.735724Z M313.880762,524.206616L314.217572,524.960371L313.265688,528.102701L310.244782,529.603385L310.583456,536.932680L308.626227,538.872075L306.809886,541.818041L305.818587,544.697498L306.080798,547.794350L304.372164,551.117641L305.649824,556.777567L306.369882,557.382934L306.362859,560.450154L304.779920,563.742405L304.844488,566.591558L302.744652,568.839818L302.753681,572.035288L303.596711,575.474148L301.935804,576.764896L300.542913,583.691000L301.011438,588.201466L299.896236,588.962789L300.543773,593.326099L301.795634,594.777759L300.881587,596.395356L301.551697,601.694072L300.538685,607.002464L299.068470,610.494716L299.390733,612.590492L298.511299,615.249044L296.383515,617.112076L296.625876,621.673143L297.602985,623.256494L299.449496,622.974263L299.395606,626.278715L300.545493,628.888965L307.247453,629.492466L309.817964,630.201815L310.987127,630.431157L309.141190,627.819792L308.245416,623.217316L309.381973,621.175478L311.913214,619.470698L313.715724,614.485923L316.991460,612.128926L317.945709,608.432708L315.294149,607.608294L312.566483,604.649133L313.361787,601.659070L315.535721,599.639327L318.155822,599.628172L319.219355,593.657780L321.446463,591.292522L324.000133,590.120681L323.173944,588.172708L321.655572,589.353293L319.783048,588.226173L319.396217,584.542821L320.466630,583.582295L323.133598,584.920067L325.975564,584.412074L327.639122,583.121877L327.127313,581.284515L327.695234,578.582536L327.112264,576.450286L330.158968,576.809109L335.721434,576.067904L339.833678,574.168384L342.498639,569.682824L342.639526,567.994131L340.906456,566.496611L341.285117,564.144205L337.763868,561.249044L337.953486,559.499082L338.742913,553.332798L339.484828,549.987900L340.177655,547.408825L343.878130,543.062123L351.206129,537.007741L351.262670,534.532232L349.871212,532.753500L348.497669,533.343008L348.044192,536.070550L345.528503,538.455208L343.335076,538.957417L337.423475,537.631189L340.154006,532.925739L339.755853,531.570964L336.899411,530.375110L333.510665,528.125455L331.243069,527.663890L326.144041,522.745031L325.696369,522.104118L322.533573,521.980442L321.451407,524.393603L319.820957,522.226438L316.192000,521.498140L313.880762,524.206616Z ",
  },
  { 
    id: "chile", 
    nome: "Chile", 
    d: "M314.287780,642.345548L312.616701,642.216334L309.646550,642.213875L309.644719,631.735724L307.670998,631.196853L305.114318,633.087839L304.214877,636.263078L302.783899,638.418538L299.105012,636.729166L295.211263,633.623218L292.924720,632.656988L296.744722,637.867155L303.066932,643.104340L305.972406,643.805749L310.990913,645.825178L313.369452,644.305999L314.287780,642.345548Z M306.992122,508.967173L306.248774,510.460888L304.822846,511.206281L305.400154,515.339231L305.603100,520.188527L303.845521,533.240396L303.345823,539.244954L301.723972,543.089615L302.056268,547.021948L301.228000,549.677667L301.866651,554.560349L300.692686,559.497874L297.073332,570.454635L295.904742,570.567725L296.133559,574.517982L296.932230,577.989324L295.657795,580.449738L293.841597,592.626196L295.590577,593.162803L296.457112,588.448656L298.318385,589.444666L296.869096,597.356107L293.786776,595.992827L292.842559,602.500632L290.201533,606.042055L294.411166,607.223391L291.481844,610.384990L290.302433,614.386928L290.658162,621.671345L292.053562,624.584130L291.267575,627.185466L292.136403,630.035483L298.761757,635.868767L301.890657,637.391338L303.065124,637.282261L303.512294,632.940519L307.350288,630.167834L309.817964,630.201815L307.247453,629.492466L300.545493,628.888965L299.395606,626.278715L299.449496,622.974263L297.602985,623.256494L296.625876,621.673143L296.383515,617.112076L298.511299,615.249044L299.390733,612.590492L299.068470,610.494716L300.538685,607.002464L301.551697,601.694072L300.881587,596.395356L301.795634,594.777759L300.543773,593.326099L299.896236,588.962789L301.011438,588.201466L300.542913,583.691000L301.935804,576.764896L303.596711,575.474148L302.753681,572.035288L302.744652,568.839818L304.844488,566.591558L304.779920,563.742405L306.362859,560.450154L306.369882,557.382934L305.649824,556.777567L304.372164,551.117641L306.080798,547.794350L305.818587,544.697498L306.809886,541.818041L308.626227,538.872075L310.583456,536.932680L310.244782,529.603385L313.265688,528.102701L314.217572,524.960371L313.880762,524.206616L311.879676,524.618785L310.793210,520.489564L309.303145,517.158661L310.176632,514.304807L308.721681,513.061439L308.351619,510.949646L306.992122,508.967173Z ",
  },
  { 
    id: "bolivia", 
    nome: "Bolivia", 
    d: "M339.543447,515.968907L340.529228,510.698722L338.468949,505.254732L333.151711,505.135434L332.085096,501.781239L332.894445,501.733293L332.195097,498.006661L328.839459,497.188301L324.725566,494.733588L321.619669,494.264616L318.607865,491.724725L318.784941,486.632406L315.155913,487.109100L310.650818,490.164253L309.222741,490.226019L307.160599,489.986865L309.558548,494.546785L308.771414,499.944733L307.687959,501.377156L307.548648,503.409949L308.741603,505.836207L306.992122,508.967173L308.351619,510.949646L308.721681,513.061439L310.176632,514.304807L309.303145,517.158661L310.793210,520.489564L311.879676,524.618785L313.880762,524.206616L316.192000,521.498140L319.820957,522.226438L321.451407,524.393603L322.533573,521.980442L325.696369,522.104118L326.144041,522.745031L327.236454,519.171925L328.636656,514.977687L333.470176,514.121584L336.045417,514.163205L338.629114,515.669202L338.676482,516.579280L339.543447,515.968907Z ",
  },
  { 
    id: "cuba", 
    nome: "Cuba", 
    d: "M279.010172,394.556520L276.405192,393.530546L266.388512,395.156284L265.787484,396.238527L268.429513,396.347650L270.422429,394.788514L273.142929,394.942355L273.070980,396.277149L276.685963,396.741109L280.104377,398.168643L281.671765,398.052510L286.205739,401.572413L284.346472,403.220384L293.939487,402.645319L294.268487,401.953197L287.762450,399.218141L282.704699,395.317202L280.114123,395.656213L279.010172,394.556520Z ",
  },
  { 
    id: "equador", 
    nome: "Equador", 
    d: "M289.765901,459.190550L287.616690,458.713137L285.263099,458.328306L281.296257,455.595406L279.389478,456.699450L275.531848,462.358744L277.098520,466.875716L278.158614,465.586624L278.758424,466.798954L277.282189,468.874621L276.894785,471.712643L280.325454,473.197011L281.893559,472.052214L284.117871,467.758389L287.453014,466.663370L290.477216,463.757380L291.340527,461.953652L290.953624,459.847403L289.765901,459.190550Z ",
  },
  { 
    id: "costarica", 
    nome: "Costa Rica", 
    d: "M261.642060,429.024095L262.421239,431.736714L265.048936,431.807936L265.231173,432.631140L268.390744,435.913007L269.895786,436.535011L270.165163,434.902172L270.579727,434.569701L271.059503,432.770100L269.757407,431.568786L268.685059,430.434675L267.982558,428.901265L267.318468,429.499700L262.277701,428.478338L261.642060,429.024095Z ",
  },
   { 
    id: "honduras", 
    nome: "Honduras", 
    d:"M268.662701,416.561613L266.852522,415.475774L264.299067,414.473518L255.597454,415.359370L255.309373,415.246813L254.045616,416.344960L252.756347,418.263779L252.180043,418.991263L252.997705,419.232069L254.535640,420.646245L255.752243,420.305836L256.507273,421.961808L257.349586,422.209638L257.828717,423.100654L259.445194,422.307788L259.386216,420.905107L262.031542,420.673184L265.781177,418.425473L269.392577,417.351934L268.662701,416.561613Z ",
  },
  { 
    id: "elsalvador", 
    nome: "El Salvador", 
    d: "M252.180043,418.991263L251.531001,419.167493L250.207120,420.542022L250.121484,420.960807L250.906827,421.573569L252.447915,421.750658L256.199413,422.632769L256.507273,421.961808L255.752243,420.305836L254.535640,420.646245L252.997705,419.232069L252.180043,418.991263Z ",
  },
  { 
    id: "colombia", 
    nome: "Colombia", 
    d: "M302.701440,425.577505L300.991229,424.656958L296.385378,428.086611L294.215242,427.850593L290.656299,429.804082L288.975685,433.414852L286.894768,435.375020L285.461746,435.285934L285.769032,437.346686L285.246115,438.178685L283.996762,439.337446L285.119775,440.825720L286.087641,448.740802L283.858168,451.943992L282.482332,452.130155L280.919960,454.734078L281.296257,455.595406L285.263099,458.328306L287.616690,458.713137L289.765901,459.190550L290.953624,459.847403L291.693031,459.584404L295.706597,462.921979L297.340488,465.831326L299.405639,466.179040L303.600008,465.686741L305.723850,466.986772L303.935027,469.813930L304.763295,469.879857L306.151170,471.357892L307.397943,463.742613L305.798880,459.939274L305.812998,457.924120L308.023265,456.691853L306.398117,456.405015L306.363791,454.669052L311.767668,454.731067L313.996209,456.291195L314.519627,455.949294L313.673802,453.182032L311.930269,451.599544L313.335773,450.216919L311.894008,446.921266L313.229642,442.488086L312.248806,442.008676L307.549436,442.475835L305.597367,440.073600L300.419654,439.986314L299.089252,436.029787L296.689941,433.934194L297.798407,430.279839L300.381530,427.006720L302.163044,426.531999L302.701440,425.577505Z ",
  },
  { 
    id: "guatemala", 
    nome: "Guatemala", 
    d: "M250.198091,409.187604L247.608804,409.192647L247.606726,410.830046L249.098296,414.261016L245.538565,414.269667L244.203719,416.617547L244.207876,418.662718L245.700019,419.843851L246.968434,420.410982L248.698495,420.462589L250.121484,420.960807L250.207120,420.542022L251.531001,419.167493L252.180043,418.991263L252.756347,418.263779L254.045616,416.344960L255.309373,415.246813L254.495796,414.878844L254.256660,415.308305L253.352431,414.786909L252.524521,414.787877L252.741728,411.523934L252.763155,409.219669L250.198091,409.187604Z ",
  },
  { 
    id: "haiti", 
    nome: "Haiti", 
    d: "M298.701490,403.173143L296.384662,403.856683L298.134501,404.315729L299.380414,406.707981L298.381806,407.359283L293.736254,406.718268L294.977366,408.570599L299.276146,408.033733L301.118214,408.529751L300.461433,406.858788L301.137635,406.365357L301.106963,403.636051L298.701490,403.173143Z ",
  },
  { 
    id: "nicaragua", 
    nome: "Nicarágua", 
    d: "M257.618676,423.301764L256.852898,423.313453L260.022000,426.445322L261.318220,427.587604L262.277701,428.478338L267.318468,429.499700L267.982558,428.901265L267.557317,428.437078L268.488132,424.708692L268.359141,421.439266L269.154015,417.627408L269.392577,417.351934L265.781177,418.425473L262.031542,420.673184L259.386216,420.905107L259.445194,422.307788L257.828717,423.100654L257.618676,423.301764Z ",
  },
  { 
    id: "panama", 
    nome: "Panamá", 
    d: "M284.418493,434.510362L279.304774,432.642188L278.358192,433.482462L271.998632,434.373533L272.055388,433.778413L271.059503,432.770100L270.579727,434.569701L270.165163,434.902172L269.895786,436.535011L270.214252,436.958655L275.182712,437.675275L275.662918,439.346475L278.111102,438.432009L276.788153,436.912476L280.561150,434.372082L281.942862,435.152325L283.072181,438.530679L283.996762,439.337446L285.246115,438.178685L285.769032,437.346686L285.461746,435.285934L284.418493,434.510362Z ",
  },
  { 
    id: "mexico", 
    nome: "México", 
    d: "M176.274796,366.853198L179.610943,373.553736L183.373549,376.695817L182.241005,379.289851L182.531164,381.163048L188.535854,384.667726L188.864997,388.577309L194.098463,392.549377L194.829772,394.382709L194.437423,390.018590L193.100070,389.918039L190.433532,382.653622L187.257622,379.168458L184.963152,375.127360L182.904952,372.934367L181.224983,367.641347L181.669430,366.319177L186.184055,368.363484L187.124474,372.068493L191.647126,378.663307L193.138982,378.918651L193.830376,381.100631L196.881451,383.335375L196.458646,385.244739L199.349127,387.249962L200.698305,389.155544L203.486955,391.530010L208.047014,398.577215L207.681037,401.221998L206.755739,401.511009L208.806415,404.808126L211.786473,406.473285L212.941734,407.807885L215.778612,408.731700L232.199569,415.460593L235.825086,414.091406L241.069086,415.570281L244.207876,418.662718L244.203719,416.617547L245.538565,414.269667L249.098296,414.261016L247.606726,410.830046L247.608804,409.192647L250.198091,409.187604L252.763155,409.219669L252.741442,408.790838L254.574122,407.239307L255.101339,407.200845L255.682015,407.152102L256.385017,407.902749L259.134325,400.278788L259.228417,398.847023L254.425066,398.363928L249.613760,399.833418L248.245735,404.902202L246.481707,406.099676L238.111816,408.239800L236.965441,407.017335L234.020497,406.240522L230.447007,400.914732L228.819781,394.053076L229.022512,389.997916L230.583809,385.105708L229.502174,385.198160L225.369684,383.561221L223.982942,379.920659L219.995783,374.113295L218.041032,372.842135L215.773432,372.903802L214.026137,375.417911L209.600351,371.746032L208.680609,370.066850L204.602978,366.466030L199.798168,366.464942L199.792787,367.807867L192.077872,367.832221L181.562515,363.941419L181.822141,363.297472L175.148114,363.908325L176.274796,366.853198Z ",
  },
  { 
    id: "paraguai", 
    nome: "Paraguai", 
    d: "M338.629114,515.669202L336.045417,514.163205L333.470176,514.121584L328.636656,514.977687L327.236454,519.171925L326.144041,522.745031L331.243069,527.663890L333.510665,528.125455L336.899411,530.375110L339.755853,531.570964L340.154006,532.925739L337.423475,537.631189L343.335076,538.957417L345.528503,538.455208L348.044192,536.070550L348.497669,533.343008L349.042227,531.570489L348.421277,527.539143L347.381033,528.029741L343.372197,522.257681L342.240083,522.844304L339.312266,522.269282L339.496652,518.225077L338.676482,516.579280L338.629114,515.669202Z ",
  },
 { 
    id: "peru", 
    nome: "Peru", 
    d: "M304.763295,469.879857L303.935027,469.813930L305.723850,466.986772L303.600008,465.686741L299.405639,466.179040L297.340488,465.831326L295.706597,462.921979L291.693031,459.584404L290.953624,459.847403L291.340527,461.953652L290.477216,463.757380L287.453014,466.663370L284.117871,467.758389L281.893559,472.052214L280.325454,473.197011L276.894785,471.712643L277.282189,468.874621L275.071421,470.629889L274.208111,472.578074L275.552129,475.234421L274.654492,476.478790L278.785369,479.431770L280.792331,482.769257L286.147263,493.585327L288.496267,497.319048L288.040785,498.141552L289.189739,500.505340L291.328989,502.274870L296.302824,505.427528L301.801223,508.337601L302.041936,509.531271L304.822846,511.206281L306.248774,510.460888L306.992122,508.967173L308.741603,505.836207L307.548648,503.409949L307.687959,501.377156L308.771414,499.944733L309.558548,494.546785L307.160599,489.986865L305.596149,490.473567L304.334399,490.149067L304.519645,485.867611L302.243950,487.526210L299.796411,487.453427L298.747640,485.952187L296.906933,485.789145L297.493056,484.582584L294.797638,480.353193L295.526368,478.661157L297.202825,477.854921L297.835456,474.075360L303.651891,471.227391L306.151170,471.357892L304.763295,469.879857Z ",
  },
  { 
    id: "uruguai", 
    nome: "Uruguai", 
    d: "M340.177655,547.408825L339.484828,549.987900L338.742913,553.332798L337.953486,559.499082L339.643129,561.353497L341.524038,561.245569L344.087813,562.693118L347.636293,563.006997L350.768776,561.132470L351.969041,559.028012L351.201112,557.144575L352.424094,555.576556L345.790140,549.461891L344.759141,549.556233L341.977944,547.066844L340.177655,547.408825Z ",
  },
  { 
    id: "venezuela", 
    nome: "Venezuela", 
    d: "M333.174715,435.475986L331.729295,435.539329L331.287356,433.289713L329.184582,431.906430L326.966504,431.694881L326.019063,430.364656L328.374230,429.531354L321.615083,429.740794L320.027415,431.331539L317.906295,430.983343L316.318125,429.720450L310.864729,429.985610L308.954152,427.474576L307.009106,427.428658L306.013579,425.437574L305.425450,427.666700L301.971564,428.815937L302.971748,431.943235L302.348935,433.975785L301.153329,434.158170L300.103482,431.927306L300.456059,427.531458L302.084216,427.201151L302.163044,426.531999L300.381530,427.006720L297.798407,430.279839L296.689941,433.934194L299.089252,436.029787L300.419654,439.986314L305.597367,440.073600L307.549436,442.475835L312.248806,442.008676L313.229642,442.488086L311.894008,446.921266L313.335773,450.216919L311.930269,451.599544L313.673802,453.182032L314.519627,455.949294L316.046598,457.416436L318.739794,456.387813L322.266633,454.109736L321.475056,448.886528L320.233729,448.165852L325.012070,448.960573L325.812677,448.303425L330.909340,446.830762L331.923642,445.768702L331.556446,444.983021L329.679551,442.868492L330.430854,442.100808L330.375602,440.811866L334.261395,436.136993L333.174715,435.475986Z ",
  },
  { 
    id: "republicadominaca", 
    nome: "República Dominicana", 
    d: "M301.258672,409.367475L301.972710,409.830340L308.172178,407.426965L309.491329,408.062401L310.521325,406.872550L308.013590,404.816707L306.496150,404.875325L303.618783,403.147234L301.453807,403.133594L301.106963,403.636051L301.137635,406.365357L300.461433,406.858788L301.118214,408.529751L301.258672,409.367475Z ",
  }, 
];

const diasMes = Array.from({ length: 30 }, (_, i) => i + 1);

// Função para encontrar o path SVG de um país pelo nome
const getPaisSVG = (nomePais) => {
  const pais = mapaPaises.find(p => p.nome === nomePais);
  if (!pais) return null;
  
  // Criar um SVG maior com apenas o path do país selecionado
  return (
    <svg 
      viewBox="240 350 200 300" 
      width="100" 
      height="100" 
      className="pais-svg-mini"
    >
      <path
        d={pais.d}
        fill="#e9ecef"
        stroke="#adb5bd"
        strokeWidth="0.3"
      />
    </svg>
  );
};

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Adicionado para manter o estado da rota original

  // Redireciona para a tela de Login se o usuário não estiver autenticado
  if (!user) {
    // Mantém a rota original como state para, talvez, tentar redirecionar após o login
    navigate('/login', { replace: true, state: { from: location.pathname } });
    return null; // Não renderiza o componente Home enquanto redireciona
  }
  // --- timeline de pedidos ---
  const params = new URLSearchParams(window.location.search);
  const initialId = params.get("id") || PEDIDOS[0].id;
  const [pedidoId, setPedidoId] = useState(initialId);

  const pedido = useMemo(
    () => PEDIDOS.find((p) => p.id === pedidoId) || PEDIDOS[0],
    [pedidoId]
  );

  // --- calendário ---
  const [eventos, setEventos] = useState({});
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [novoEvento, setNovoEvento] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAddEvento = () => {
    if (novoEvento.trim()) {
      setEventos((prev) => ({
        ...prev,
        [diaSelecionado]: [...(prev[diaSelecionado] || []), novoEvento.trim()],
      }));
      setNovoEvento("");
      setShowModal(false);
    }
  };

  // --- mapa ---
  const [paisSelecionado, setPaisSelecionado] = useState(null);
  const [paisHover, setPaisHover] = useState(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const svgRef = useRef(null);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 0.5));
  };

  const handleMouseDown = useCallback((e) => {
    if (e.button === 0) { // Left mouse button
      isDragging.current = true;
      startPos.current = {
        x: e.clientX - translate.x,
        y: e.clientY - translate.y,
      };
      svgRef.current?.style.setProperty('cursor', 'grabbing');
    }
  }, [translate]);

  const handleMouseMove = useCallback((e) => {
    if (isDragging.current) {
      setTranslate((prev) => ({
        x: e.clientX - startPos.current.x,
        y: e.clientY - startPos.current.y,
      }));
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    svgRef.current?.style.setProperty('cursor', 'grab');
  }, []);

  // Adicionar event listeners para o SVG
  React.useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      svg.addEventListener('mousedown', handleMouseDown);
      svg.addEventListener('mousemove', handleMouseMove);
      svg.addEventListener('mouseup', handleMouseUp);
      svg.addEventListener('mouseleave', handleMouseUp);
      svg.style.cursor = 'grab';
      svg.style.userSelect = 'none';
    }

    return () => {
      if (svg) {
        svg.removeEventListener('mousedown', handleMouseDown);
        svg.removeEventListener('mousemove', handleMouseMove);
        svg.removeEventListener('mouseup', handleMouseUp);
        svg.removeEventListener('mouseleave', handleMouseUp);
      }
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  const transformStyle = `translate(${translate.x}px, ${translate.y}px) scale(${scale})`;

  // Valor de progresso dinâmico baseado no pedido selecionado
  const progressoAtual = pedido.progresso || {
    "1023 - Corretiva": 40,
    "1041 - Instalação": 10,
    "1077 - Preventiva": 25,
  }[pedido.id] || 65;

  return (
    <div className="container-fluid p-4">
      <h1 className="mb-4">Dashboard OTIS</h1>

      {/* linha com gráfico + timeline */}
      <div className="row mt-4">
        {/* gráfico circular de progresso */}
        <div className="col-md-4 d-flex justify-content-center align-items-stretch">
          <Card className="h-100 w-100 shadow-sm" style={{ borderRadius: '12px' }}>
  {/* O d-flex flex-column align-items-center e text-center já centralizam o conteúdo horizontalmente. */}
  <Card.Body className="d-flex flex-column align-items-center text-center p-5"> 
    <Card.Title className="mb-4" style={{ color: '#041c44', fontSize: '1.25rem', fontWeight: 600 }}>
      Andamento do Projeto
    </Card.Title>

    {/* GRÁFICO CIRCULAR APRIMORADO */}
    <div style={{ position: 'relative', width: '100%', maxWidth: '280px', height: '280px' }}>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: progressoAtual, label: 'Concluído' },
              { id: 1, value: 100 - progressoAtual, label: 'Restante' },
            ],
            innerRadius: 80, // Aumentado para um anel mais robusto
            outerRadius: 120, // Gráfico um pouco maior
            colors: ['#041c44', '#dee2e6'],
            cornerRadius: 6,
            paddingAngle: 0, // Sem espaço entre as fatias para um look mais sólido
          },
        ]}
        width={280} // Ajuste para o tamanho do div pai
        height={280} // Ajuste para o tamanho do div pai
        sx={{ '& .MuiChartsLegend-root': { display: 'none' } }}
        slotProps={{
          pieChart: { margin: { left: 0, right: 0, top: 0, bottom: 0 } },
        }}
      />
      
      {/* Texto centralizado no meio do anel (Melhorias de Estilo) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          // Removendo background e box-shadow para um visual mais clean, deixando apenas o texto
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: '2.5rem', // Fonte maior para destaque
            fontWeight: 'bold',
            color: '#041c44', // Cor do progresso
            lineHeight: '1',
          }}
        >
          {progressoAtual}%
        </h2>
        <span style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 500 }}>
          Concluído
        </span>
      </div>
    </div>
    
    {/* LEGENDA SIMPLIFICADA (Substitui as barras de progresso) */}
    <div className="d-flex justify-content-center mt-4 gap-4 w-100">
      <div className="d-flex align-items-center">
        <span style={{ height: '10px', width: '10px', backgroundColor: '#041c44', borderRadius: '50%', display: 'inline-block', marginRight: '8px' }}></span>
        <span className="text-muted" style={{ fontWeight: '500' }}>Concluído</span>
      </div>
      <div className="d-flex align-items-center">
        <span style={{ height: '10px', width: '10px', backgroundColor: '#dee2e6', borderRadius: '50%', display: 'inline-block', marginRight: '8px' }}></span>
        <span className="text-muted" style={{ fontWeight: '500' }}>Restante</span>
      </div>
    </div>

    {/* O bloco <div className="w-100 mt-3"> com as ProgressBars foi removido
        para evitar duplicação de informação e deixar o gráfico mais amigável. */}
        
  </Card.Body>
</Card>
        </div>

        {/* timeline */}
        <div className="col-md-8">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Timeline do Pedido</Card.Title>
              <Timeline statusAtual={pedido.status} />
              <div className="mt-3">
                <Form.Select 
                  value={pedidoId} 
                  onChange={(e) => setPedidoId(e.target.value)}
                >
                  {PEDIDOS.map(pedido => (
                    <option key={pedido.id} value={pedido.id}>
                      Pedido #{pedido.id} - {pedido.descricao || pedido.obra}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="mt-3">
                <p><strong>Pedido:</strong> #{pedido.id}</p>
                <p><strong>Descrição:</strong> {pedido.descricao || pedido.obra}</p>
                <p><strong>Cliente:</strong> {pedido.cliente}</p>
                <p><strong>Modelo:</strong> {pedido.modelo}</p>
                <p><strong>Status atual:</strong> {pedido.status}</p>
                <p><strong>Previsão de entrega:</strong> {new Date(pedido.previsaoEntrega).toLocaleDateString()}</p>
                <p><strong>Responsável atual:</strong> {pedido.responsavelAtual}</p>
                <Button
                  variant="custom"
                  href={`/rastreamento?id=${pedido.id}`}
                  className="mt-3"
                >
                  Mais Informações sobre o Contrato
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* linha com calendário + funcionários - ALINHADOS COM A MESMA ALTURA */}
      <div className="row mt-4 equal-height-cards">
        {/* calendário */}
        <div className="col-md-7">
          <Card className="h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Calendário - Setembro 2025</Card.Title>
              <div className="calendar flex-grow-1">
                {diasMes.map((dia) => (
                  <div
                    key={dia}
                    className="calendar-day"
                    onClick={() => {
                      setDiaSelecionado(dia);
                      setShowModal(true);
                    }}
                  >
                    <strong>{dia}</strong>
                    <div className="calendar-events">
                      {(eventos[dia] || []).map((ev, i) => (
                        <Badge key={i} className="badge-primary-custom calendar-event me-1 mb-1 d-block">
                          {ev}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* funcionários */}
        <div className="col-md-5">
          <Card className="h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Funcionários perto de mim</Card.Title>
              <div className="list-group flex-grow-1">
                {funcionariosMock.map((f) => (
                  <div
                    key={f.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center">
                      <div className={`status-indicator ${f.online ? 'online' : 'offline'} me-2`}></div>
                      <div>
                        <strong>{f.nome}</strong>
                        <br />
                        <small className="text-muted">{f.cargo}</small>
                        <br />
                        <small className="text-muted">{f.distancia}</small>
                      </div>
                    </div>
                    <Button variant="outline-primary" size="sm">
                      <i className="bi bi-chat-dots"></i> Contatar
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <Button variant="custom" href="/usuarios">
                  Ver Todos os Funcionários
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* linha com mapa */}
      <div className="row mt-4">
        <div className="col-md-7">
          <Card>
            <Card.Body>
              <Card.Title>Mapa Interativo - América Latina</Card.Title>
              
              <div className="mapa-container">
                <div className="zoom-controls">
                  <Button variant="custom" size="sm" onClick={handleZoomIn}>
                    Zoom In
                  </Button>
                  <Button variant="custom" size="sm" onClick={handleZoomOut}>
                    Zoom Out
                  </Button>
                </div>
                <svg
                  ref={svgRef}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="240 350 200 300"
                  width="100%"
                  height="500"
                  className="mapa-america-latina"
                  style={{
                    transform: transformStyle,
                    transformOrigin: 'center',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  {mapaPaises.map((pais) => (
                    <path
                      key={pais.id}
                      id={pais.id}
                      d={pais.d}
                      className={`mapa-pais ${
                        paisHover === pais.nome || paisSelecionado === pais.nome ? "destaque" : ""
                      }`}
                      fill={
                        paisSelecionado === pais.nome
                          ? "#0d6efd"
                          : paisHover === pais.nome
                          ? "#6ea8fe"
                          : "#e9ecef"
                      }
                      stroke="#adb5bd"
                      strokeWidth="0.5"
                      onMouseEnter={() => setPaisHover(pais.nome)}
                      onMouseLeave={() => setPaisHover(null)}
                      onClick={() => setPaisSelecionado(pais.nome)}
                      style={{ cursor: "pointer" }}
                    />
                  ))}
                </svg>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* info do país COM SVG NO CANTO DIREITO */}
        <div className="col-md-5">
          <Card>
            <Card.Body>
              <Card.Title>
                {paisSelecionado
                  ? `Informações - ${paisSelecionado}`
                  : "Informações do País"}
              </Card.Title>
              {paisSelecionado ? (
                <div className="pais-info-container">
                  <div className="pais-content">
                    <h5>{paisSelecionado}</h5>
                    <p>
                      <strong>Total de Funcionários:</strong>{" "}
                      {paisesInfo[paisSelecionado].funcionarios}
                    </p>
                    <p>
                      <strong>Contratos:</strong>{" "}
                      {paisesInfo[paisSelecionado].contratos}
                    </p>
                    <p>
                      <strong>Picos em Estoques:</strong>{" "}
                      {paisesInfo[paisSelecionado].estoques} locais ativos
                    </p>
                    <p>
                      <strong>Market Share:</strong>{" "}
                      {paisesInfo[paisSelecionado].marketShare}
                    </p>
                    <p>
                      <strong>Total de Instalações:</strong>{" "}
                      {paisesInfo[paisSelecionado].totalInstallations}
                    </p>
                    <p>
                      <strong>Crescimento Anual:</strong>{" "}
                      {paisesInfo[paisSelecionado].annualGrowth}
                    </p>
                    <p>
                      <strong>Projetos Chave:</strong>{" "}
                      {paisesInfo[paisSelecionado].keyProjects}
                    </p>
                    <p>
                      <strong>Detalhes:</strong>{" "}
                      {paisesInfo[paisSelecionado].detalhes}
                    </p>
                    <Button variant="custom" href="/fornecedores" className="mt-3 w-100">
                      Ver Detalhes Completos
                    </Button>
                  </div>
                  
                  {/* SVG do país no canto direito */}
                  <div className="pais-svg-container">
                    {getPaisSVG(paisSelecionado)}
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted py-4">
                  <i className="bi bi-globe-americas" style={{ fontSize: "3rem" }}></i>
                  <p className="mt-3">
                    Passe o mouse ou clique sobre um país para ver informações detalhadas.
                  </p>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* modal para adicionar evento */}
<Modal 
  show={showModal} 
  onHide={() => setShowModal(false)} 
  centered 
  dialogClassName="modal-grande"
>
  <Modal.Header closeButton className="border-0">
    <Modal.Title className="fw-bold text-primary fs-2">
      📅 Adicionar Evento - Dia {diaSelecionado}
    </Modal.Title>
  </Modal.Header>

  <Modal.Body className="px-5 py-4">
    <Form.Group>
      <Form.Label className="fw-semibold fs-5 mb-3">Descrição do Evento</Form.Label>
      <Form.Control
        as="textarea"
        rows={6}
        placeholder="Digite os detalhes do evento..."
        value={novoEvento}
        onChange={(e) => setNovoEvento(e.target.value)}
        className="rounded-3 shadow-sm"
        style={{ resize: "none", fontSize: "1.1rem", minHeight: "200px" }}
      />
    </Form.Group>
  </Modal.Body>

  <Modal.Footer className="border-0 d-flex justify-content-end px-5 pb-4 gap-3">
    <Button 
      variant="secondary" 
      onClick={() => setShowModal(false)} 
      className="px-4 py-2 rounded-3 fs-6"
    >
      Cancelar
    </Button>
    <Button 
      variant="primary" 
      onClick={handleAddEvento} 
      className="px-4 py-2 rounded-3 fs-6"
    >
      Salvar Evento
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
}