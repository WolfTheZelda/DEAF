<template>
  <section v-if="type == 0" class="container white-text">
    <div class="section">
      <div class="row">
        <div class="col s12 center">
          <h3>{{title}}</h3>
          <p class="center-align light" v-html="text"></p>
        </div>
      </div>
    </div>
  </section>
  <section v-else-if="type == 1" class="container white-text">
    <div class="section">
      <div class="row">
        <h3 class="center">{{title}}</h3>

        <div class="col s12 m3" v-for="content in contentMultiple" :key="content.icon">
          <div class="icon-block">
            <h2 class="center" :class="content.class">
              <i class="material-icons large">{{content.icon}}</i>
            </h2>
            <h5 class="center">{{content.title}}</h5>
            <p class="center-align light" v-html="content.text"></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    contentMultiple: [
      {
        title: "TEMA",
        text: "<p>Um homem comum deve ter o direito de tirar a vida de outro? Se um bandido anda armado porque um cidadão de bem não pode? Armar a população é a solução? Até quando a vida de homens honestos será tirada pela falta de proteção?</p> <p>No Debate Filosófico deste ano o tema discutido será a legalização do porte de armas, umas das promessas de campanha do atual presidente Jair Bolsonaro e que volta e meia é tema de discussão politica por tratar de questões de cunho religioso, social e moral. Portanto, no âmbito escolar, a discussão filosófica desse tema é essencial para desenvolver e estimular as opiniões divergentes dos estudantes e dos convidados.</p>",
        icon: "chat_bubble",
        class: "yellow-text"
      },
      {
        title: "ARGUMENTOS A FAVOR",
        text: "<p>1) O desarmamento fracassou. Depois que ele entrou em vigor os índices de crimes envolvendo armas de fogo aumentaram drasticamente.</p> <p>2) Não há uma relação direta entre o número de armas; e os índices de homicídios. Ex: A Suíça o Uruguai e a Argentina têm um alto número de armas; e possui índices baixos de homicídios.</p> <p>3) O elevado número de homicídios no Brasil seria muito mais culpa da impunidade; visto que a justiça soluciona apenas 10% dos homicídios.</p> <p>4) A cultura da violência: A população brasileira já seria propensa a praticar crimes; e não importa se eles tiverem acesso a armas ou não.</p> <p>5) Não adianta desarmar o cidadão; enquanto os bandidos continuam fortemente armados. Sendo que as armas por eles usadas vem da ilegalidade.</p> <p>6) A cláusula subjetiva da comprovação de efetiva necessidade; vem impedindo o cidadão de comprar armas legais.</p> <p>7) Quanto aos acidentes com armas de fogo. Esses representam um número pequeno de mortes. Além disso piscinas, tanques matam muito mais do que as armas, e aí vão proibi-las também!?</p>",
        icon: "thumb_up_alt",
        class: "green-text"
      },
      {
        title: "ARGUMENTOS CONTRA",
        text: "<p>1) Países mais armados não são mais seguros: Nos Estados Unidos; onde o acesso a armas é mais fácil; o número de homicídios é 25 vezes maior do que em outros países desenvolvidos. O número de crianças mortas em acidentes com armas de fogo é duas vezes maior do que em outros países. A Suíça por exemplo que é um país com um grande número de armas; ocupa 11ª posição em homicídios no mundo; porém 43% dessas mortes são crimes domésticos.</p> <p>2) Armas em casa aumentam o risco à própria família, em especial às mulheres. Um estudo mostra que a maioria das crianças entre 7 e 17 anos não sabem diferenciar uma de brinquedo de uma arma real; entre 2014 e 2015 foram registradas 2715 mortes de crianças nos EUA. Um terço foram suicídios voluntários ou involuntários. Além disso o risco de feminicídio pode aumentar consideravelmente.</p> <p>3) Segundo o Datafolha 61% dos brasileiros consideram que a posse de armas de fogo deve ser proibida por representar uma ameaça a vida. Esse percentual aumenta nos grupos mais vulneráveis.</p> <p>4) A quantidade de armas ilegais deve aumentar ainda mais: as armas ilegais não nascem ilegais, pelo contrário, de acordo com o instituto Sou da Paz, baseado nas informações de São Paulo, 3 em cada 4 armas apreendidas eram legalizadas, 64% delas foram fabricadas antes do desarmamento, quando o controle era bem menor. O mercado legal abastece o ilegal, seja por roubo, corrupção de agentes públicos, falta de fiscalização. O mesmo acontece com as munições.</p>",
        icon: "thumb_down_alt",
        class: "red-text"
      },
      {
        title: "TEXTO",
        text: "TEXTO",
        icon: "public",
        class: "blue-text"
      }
    ]
  }),
  props: {
    title: String,
    text: String,
    type: 0
  }
};
</script>
