import { Component, inject, OnInit } from '@angular/core';
import { Currency } from '../../../interface/currency.interface';
import { ExchangeRateService } from '../../../service/exchange-rate.service';
import { CardCurrencyComponent } from '../card-currency/card-currency.component';
import { CurrencyERA } from '../../../interface/currency-era';
import { UserServiceService } from '../../../service/user-service.service';
import { User } from '../../../interface/user.interface';

@Component({
  selector: 'app-list-currency',
  standalone: true,
  imports: [CardCurrencyComponent],
  templateUrl: './list-currency.component.html',
  styleUrl: './list-currency.component.css'
})
export class ListCurrencyComponent implements OnInit{
  ngOnInit(): void {
    this.obtenerMonedasPrincipales();
    
    this.idUsuario=  localStorage.getItem("userId")
    console.log(this.idUsuario);

    if(this.idUsuario!=null){
      this.us.getUserById(this.idUsuario).subscribe({
        next:(user:User)=>{
          this.user=user
          console.log(this.user);
          this.obtenerMonedasFavoritas();
        },
        error:(e:Error)=>{
          console.log(e.message);
        }
      })
    }
    

  }

  rates: any;  // Aquí almacenamos las tasas de cambio
  error: string | null = null;  // Aquí almacenamos cualquier error
  

  ers=inject(ExchangeRateService)
  us=inject(UserServiceService)

  idUsuario: string | null = null

  user?:User;
  monedasFavoritas: { code: string, name: string, rate: number }[] = [];

  obtenerMonedasFavoritas() {
    this.user?.favCurrencies.forEach((code) => {
      this.ers.getExchangeRates(code).subscribe({
        next: (response) => {
          const rate = response.conversion_rates["ARS"]; // Supongo que quieres el tipo de cambio respecto a ARS
          this.monedasFavoritas.push({
            code: code,
            name: this.getNombreMonedaFavorita(code), // Un método para obtener el nombre de la moneda
            rate: rate
          });
        },
        error: (err) => {
          console.error(`Error al obtener datos para ${code}:`, err);
        }
      });
    });
  } 


  codesMonedasPrincipales: string[] = [
    "USD", // Dólar Estadounidense
    "EUR", // Euro
    "JPY", // Yen Japonés
    "GBP", // Libra Esterlina
    "CHF", // Franco Suizo
    "CAD", // Dólar Canadiense
    "AUD", // Dólar Australiano
    "CNY", // Yuan Chino
    "INR", // Rupia India
    "BRL", // Real Brasileño
  ];
  monedasPrincipales: { code: string, name: string, rate: number }[] = []; // Aquí guardaremos los datos.

  obtenerMonedasPrincipales() {
    this.codesMonedasPrincipales.forEach((code) => {
      this.ers.getExchangeRates(code).subscribe({
        next: (response) => {
          const rate = response.conversion_rates["ARS"]; // Supongo que quieres el tipo de cambio respecto a ARS
          console.log(rate);
          this.monedasPrincipales.push({
            code: code,
            name: this.getNombreMonedaPrincipal(code), // Un método para obtener el nombre de la moneda
            rate: rate
          });
        },
        error: (err) => {
          console.error(`Error al obtener datos para ${code}:`, err);
        }
      });
    });
  }

  getNombreMonedaPrincipal(code: string): string {
    const nombres: { [key: string]: string } = {
      USD: "Dólar Estadounidense",
      EUR: "Euro",
      JPY: "Yen Japonés",
      GBP: "Libra Esterlina",
      CHF: "Franco Suizo",
      CAD: "Dólar Canadiense",
      AUD: "Dólar Australiano",
      CNY: "Yuan Chino",
      INR: "Rupia India",
      BRL: "Real Brasileño",
    };
  
    return nombres[code] || "Nombre desconocido";
  }

  getNombreMonedaFavorita(code: string): string {
    const nombres: { [key: string]: string } = {
      AED: 'Dirham de los Emiratos Árabes Unidos',
      AFN: 'Afghani Afgano',
      ALL: 'Lek Albanés',
      AMD: 'Dram Armenio',
      ANG: 'Florín de las Antillas Neerlandesas',
      AOA: 'Kwanza Angoleño',
      ARS: 'Peso Argentino',
      AUD: 'Dólar Australiano',
      AWG: 'Florín Arubeño',
      AZN: 'Manat Azerbaiyano',
      BAM: 'Marco Convertible de Bosnia y Herzegovina',
      BBD: 'Dólar de Barbados',
      BDT: 'Taka Bangladesí',
      BGN: 'Lev Búlgaro',
      BHD: 'Dinar Bahreiní',
      BIF: 'Franco Burundés',
      BMD: 'Dólar de Bermudas',
      BND: 'Dólar de Brunéi',
      BOB: 'Boliviano',
      BRL: 'Real Brasileño',
      BSD: 'Dólar de Bahamas',
      BTN: 'Ngultrum Butanés',
      BWP: 'Pula de Botsuana',
      BYN: 'Rublo Bielorruso',
      BZD: 'Dólar de Belice',
      CAD: 'Dólar Canadiense',
      CDF: 'Franco Congoleño',
      CHF: 'Franco Suizo',
      CLP: 'Peso Chileno',
      CNY: 'Yuan Chino',
      COP: 'Peso Colombiano',
      CRC: 'Colón Costarricense',
      CUP: 'Peso Cubano',
      CVE: 'Escudo Caboverdiano',
      CZK: 'Corona Checa',
      DJF: 'Franco Yibutiano',
      DKK: 'Corona Danesa',
      DOP: 'Peso Dominicano',
      DZD: 'Dinar Argelino',
      EGP: 'Libra Egipcia',
      ERN: 'Nakfa Eritreo',
      ETB: 'Birr Etíope',
      EUR: 'Euro',
      FJD: 'Dólar Fiyiano',
      FKP: 'Libra de las Islas Malvinas',
      FOK: 'Corona de las Islas Feroe',
      GBP: 'Libra Esterlina',
      GEL: 'Lari Georgiano',
      GGP: 'Libra de Guernesey',
      GHS: 'Cedi Ghanés',
      GIP: 'Libra de Gibraltar',
      GMD: 'Dalasi Gambiano',
      GNF: 'Franco Guineano',
      GTQ: 'Quetzal Guatemalteco',
      GYD: 'Dólar Guyanés',
      HKD: 'Dólar de Hong Kong',
      HNL: 'Lempira Hondureño',
      HRK: 'Kuna Croata',
      HTG: 'Gourde Haitiano',
      HUF: 'Forinto Húngaro',
      IDR: 'Rupia Indonesia',
      ILS: 'Nuevo Shekel Israelí',
      IMP: 'Libra de la Isla de Man',
      INR: 'Rupia India',
      IQD: 'Dinar Iraquí',
      IRR: 'Rial Iraní',
      ISK: 'Corona Islandesa',
      JEP: 'Libra de Jersey',
      JMD: 'Dólar Jamaicano',
      JOD: 'Dinar Jordano',
      JPY: 'Yen Japonés',
      KES: 'Chelín Keniano',
      KGS: 'Som Kirguís',
      KHR: 'Riel Camboyano',
      KID: 'Dólar de Kiribati',
      KMF: 'Franco Comorense',
      KRW: 'Won Surcoreano',
      KWD: 'Dinar Kuwaití',
      KYD: 'Dólar de las Islas Caimán',
      KZT: 'Tenge Kazajo',
      LAK: 'Kip Laosiano',
      LBP: 'Libra Libanesa',
      LKR: 'Rupia de Sri Lanka',
      LRD: 'Dólar Liberiano',
      LSL: 'Loti Lesotense',
      LYD: 'Dinar Libio',
      MAD: 'Dírham Marroquí',
      MDL: 'Leu Moldavo',
      MGA: 'Ariary Malgache',
      MKD: 'Denar Macedonio',
      MMK: 'Kyat Birmano',
      MNT: 'Tugrik Mongol',
      MOP: 'Pataca Macanesa',
      MRU: 'Ouguiya Mauritana',
      MUR: 'Rupia de Mauricio',
      MVR: 'Rufiyaa Maldiva',
      MWK: 'Kwacha Malauí',
      MXN: 'Peso Mexicano',
      MYR: 'Ringgit Malayo',
      MZN: 'Metical Mozambicano',
      NAD: 'Dólar Namibio',
      NGN: 'Naira Nigeriana',
      NIO: 'Córdoba Nicaragüense',
      NOK: 'Corona Noruega',
      NPR: 'Rupia Nepalí',
      NZD: 'Dólar Neozelandés',
      OMR: 'Rial Omaní',
      PAB: 'Balboa Panameño',
      PEN: 'Sol Peruano',
      PGK: 'Kina Papúa Nueva Guinea',
      PHP: 'Peso Filipino',
      PKR: 'Rupia Paquistaní',
      PLN: 'Zloty Polaco',
      PYG: 'Guaraní Paraguayo',
      QAR: 'Rial Catarí',
      RON: 'Leu Rumano',
      RSD: 'Dinar Serbio',
      RUB: 'Rublo Ruso',
      RWF: 'Franco Ruandés',
      SAR: 'Rial Saudí',
      SBD: 'Dólar de las Islas Salomón',
      SCR: 'Rupia de Seychelles',
      SDG: 'Libra Sudanesa',
      SEK: 'Corona Sueca',
      SGD: 'Dólar Singapurense',
      SHP: 'Libra de Santa Elena',
      SLE: 'Leone de Sierra Leona',
      SOS: 'Chelín Somalí',
      SRD: 'Dólar Surinamés',
      SSP: 'Libra de Sudán del Sur',
      STN: 'Dobra de Santo Tomé y Príncipe',
      SYP: 'Libra Siria',
      SZL: 'Lilangeni Suazi',
      THB: 'Baht Tailandés',
      TJS: 'Somoni Tayiko',
      TMT: 'Manat Turcomano',
      TND: 'Dinar Tunecino',
      TOP: 'Paʻanga Tongano',
      TRY: 'Lira Turca',
      TTD: 'Dólar de Trinidad y Tobago',
      TVD: 'Dólar Tuvaluano',
      TWD: 'Nuevo Dólar Taiwanés',
      TZS: 'Chelín Tanzano',
      UAH: 'Grivna Ucraniana',
      UGX: 'Chelín Ugandés',
      USD: 'Dólar Estadounidense',
      UYU: 'Peso Uruguayo',
      UZS: 'Som Uzbeco',
      VEF: 'Bolívar Venezolano',
      VND: 'Dong Vietnamita',
      VUV: 'Vatu Vanuatense',
      WST: 'Tala Samoa',
      XAF: 'Franco CFA de África Central',
      XCD: 'Dólar del Caribe Oriental',
      XOF: 'Franco CFA de África Occidental',
      XPF: 'Franco CFP',
      YER: 'Rial Yemení',
      ZAR: 'Rand Sudafricano',
      ZMW: 'Kwacha Zambiano',
      ZWD: 'Dólar Zimbabuense',
    };

    return nombres[code] || code;
  }
  

}
