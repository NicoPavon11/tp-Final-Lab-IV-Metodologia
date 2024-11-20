import { Component, inject, OnInit } from '@angular/core';
import { ExchangeRateService } from '../../service/exchange-rate.service';
import { CardCurrencyComponent } from '../../currency/components/card-currency/card-currency.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quotation-page',
  standalone: true,
  imports: [CardCurrencyComponent, FormsModule,CommonModule],
  templateUrl: './quotation-page.component.html',
  styleUrl: './quotation-page.component.css',
})
export class QuotationPageComponent implements OnInit {
  ngOnInit(): void {
    this.obtenerValorMonedas();
  }

  ers = inject(ExchangeRateService);

  valorMonedas: any[] = [];
  monedas: { code: string; name: string; rate: number }[] = [];
  monedasContinente: { code: string; name: string; rate: number }[] = [];
  

  pasarAEquivalente(tasa: number) {
    return 1 / tasa;
  }

  obtenerValorMonedas() {
    this.ers.getExchangeRates('ARS').subscribe({
      next: (response) => {
        const tasas = response.conversion_rates;

        // Mapeamos las tasas y las convertimos a nuestro formato
        this.monedas = Object.keys(tasas).map((key) => {
          return {
            code: key, // Código de la moneda (como USD, EUR, etc.)
            name: this.getNombreMoneda(key), // Nombre de la moneda usando la función
            rate: this.pasarAEquivalente(tasas[key]), // Modificamos la tasa usando pasarAEquivalente
          };
        });

        // Mostrar el resultado
        console.log('Monedas cargadas:', this.monedas);

        this.obtenerMonedasPorContinente();
        
      },
      error: () => {
        console.error('Error al obtener las tasas de cambio');
      },
    });
  }

  obtenerMonedasPorContinente() {
    const monedasFiltradasPorContinente =
      this.continente === 'Todas'
        ? this.monedas
        : this.monedas.filter(
            (moneda) => this.monedasPorContinente[moneda.code] === this.continente
          );
    
          console.log(monedasFiltradasPorContinente);
    // Aplicar el filtro de búsqueda por nombre o código de la moneda
    this.monedasContinente = monedasFiltradasPorContinente.filter((moneda) =>
      moneda.name.toLowerCase().includes(this.filtro.toLowerCase()) ||
      moneda.code.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  continente:string="Todas"

  filtro: string = '';

  trackByIndex(index: number, item: any): number {
    return index;
  }
  

  getNombreMoneda(code: string): string {
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

  monedasPorContinente: { [key: string]: string } = {
    AED: 'Asia',
    AFN: 'Asia',
    ALL: 'Europa',
    AMD: 'Asia',
    ANG: 'América',
    AOA: 'África',
    ARS: 'América',
    AUD: 'Oceanía',
    AWG: 'América',
    AZN: 'Asia',
    BAM: 'Europa',
    BBD: 'América',
    BDT: 'Asia',
    BGN: 'Europa',
    BHD: 'Asia',
    BIF: 'África',
    BMD: 'América',
    BND: 'Asia',
    BOB: 'América',
    BRL: 'América',
    BSD: 'América',
    BTN: 'Asia',
    BWP: 'África',
    BYN: 'Europa',
    BZD: 'América',
    CAD: 'América',
    CDF: 'África',
    CHF: 'Europa',
    CLP: 'América',
    CNY: 'Asia',
    COP: 'América',
    CRC: 'América',
    CUP: 'América',
    CVE: 'África',
    CZK: 'Europa',
    DJF: 'África',
    DKK: 'Europa',
    DOP: 'América',
    DZD: 'África',
    EGP: 'África',
    ERN: 'África',
    ETB: 'África',
    EUR: 'Europa',
    FJD: 'Oceanía',
    FKP: 'Oceanía',
    FOK: 'Europa',
    GBP: 'Europa',
    GEL: 'Europa',
    GGP: 'Europa',
    GHS: 'África',
    GIP: 'Europa',
    GMD: 'África',
    GNF: 'África',
    GTQ: 'América',
    GYD: 'América',
    HKD: 'Asia',
    HNL: 'América',
    HRK: 'Europa',
    HTG: 'América',
    HUF: 'Europa',
    IDR: 'Asia',
    ILS: 'Asia',
    IMP: 'Europa',
    INR: 'Asia',
    IQD: 'Asia',
    IRR: 'Asia',
    ISK: 'Europa',
    JEP: 'Europa',
    JMD: 'América',
    JOD: 'Asia',
    JPY: 'Asia',
    KES: 'África',
    KGS: 'Asia',
    KHR: 'Asia',
    KID: 'Oceanía',
    KMF: 'África',
    KRW: 'Asia',
    KWD: 'Asia',
    KYD: 'América',
    KZT: 'Asia',
    LAK: 'Asia',
    LBP: 'Asia',
    LKR: 'Asia',
    LRD: 'África',
    LSL: 'África',
    LYD: 'África',
    MAD: 'África',
    MDL: 'Europa',
    MGA: 'África',
    MKD: 'Europa',
    MMK: 'Asia',
    MNT: 'Asia',
    MOP: 'Asia',
    MRU: 'África',
    MUR: 'África',
    MVR: 'Asia',
    MWK: 'África',
    MXN: 'América',
    MYR: 'Asia',
    MZN: 'África',
    NAD: 'África',
    NGN: 'África',
    NIO: 'América',
    NOK: 'Europa',
    NPR: 'Asia',
    NZD: 'Oceanía',
    OMR: 'Asia',
    PAB: 'América',
    PEN: 'América',
    PGK: 'Oceanía',
    PHP: 'Asia',
    PKR: 'Asia',
    PLN: 'Europa',
    PYG: 'América',
    QAR: 'Asia',
    RON: 'Europa',
    RSD: 'Europa',
    RUB: 'Europa',
    RWF: 'África',
    SAR: 'Asia',
    SBD: 'Oceanía',
    SCR: 'África',
    SDG: 'África',
    SEK: 'Europa',
    SGD: 'Asia',
    SHP: 'África',
    SLE: 'África',
    SOS: 'África',
    SRD: 'América',
    SSP: 'África',
    STN: 'África',
    SYP: 'Asia',
    SZL: 'África',
    THB: 'Asia',
    TJS: 'Asia',
    TMT: 'Asia',
    TND: 'África',
    TOP: 'Oceanía',
    TRY: 'Asia',
    TTD: 'América',
    TVD: 'Oceanía',
    TWD: 'Asia',
    TZS: 'África',
    UAH: 'Europa',
    UGX: 'África',
    USD: 'América',
    UYU: 'América',
    UZS: 'Asia',
    VEF: 'América',
    VND: 'Asia',
    VUV: 'Oceanía',
    WST: 'Oceanía',
    XAF: 'África',
    XCD: 'Oceanía',
    XOF: 'África',
    XPF: 'Oceanía',
    YER: 'Asia',
    ZAR: 'África',
    ZMW: 'África',
    ZWD: 'África',
  };

  
}
