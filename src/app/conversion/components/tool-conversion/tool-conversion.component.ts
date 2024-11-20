import { Component, inject, OnInit} from '@angular/core';
import { CurrencyERA } from '../../../interface/currency-era';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExchangeRateService } from '../../../service/exchange-rate.service';
import { format } from 'date-fns';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tool-conversion',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './tool-conversion.component.html',
  styleUrl: './tool-conversion.component.css'
})
export class ToolConversionComponent implements OnInit {
  message:string="";
  baseCurrency: string = 'USD'
  targetCurrency: string = 'ARS';
  amount: number = 0;
  convertedAmount: number | null = null;
  currencykeys:string[]=[]
  currencyNames: { [key: string]: string } = {
    AED: "Dírham de los Emiratos Árabes Unidos",
    AFN: "Afghani afgano",
    ALL: "Lek albanés",
    AMD: "Dram armenio",
    ANG: "Florín antillano neerlandés",
    AOA: "Kwanza angoleño",
    ARS: "Peso argentino",
    AUD: "Dólar australiano",
    AWG: "Florín arubeño",
    AZN: "Manat azerbaiyano",
    BAM: "Marco convertible de Bosnia y Herzegovina",
    BBD: "Dólar barbadense",
    BDT: "Taka de Bangladés",
    BGN: "Lev búlgaro",
    BHD: "Dinar bareiní",
    BIF: "Franco burundés",
    BMD: "Dólar bermudeño",
    BND: "Dólar de Brunéi",
    BOB: "Boliviano",
    BRL: "Real brasileño",
    BSD: "Dólar bahameño",
    BTN: "Ngultrum butanés",
    BWP: "Pula botsuano",
    BYN: "Rublo bielorruso",
    BZD: "Dólar beliceño",
    CAD: "Dólar canadiense",
    CDF: "Franco congoleño",
    CHF: "Franco suizo",
    CLP: "Peso chileno",
    CNY: "Yuan chino",
    COP: "Peso colombiano",
    CRC: "Colón costarricense",
    CUP: "Peso cubano",
    CVE: "Escudo caboverdiano",
    CZK: "Corona checa",
    DJF: "Franco yibutiano",
    DKK: "Corona danesa",
    DOP: "Peso dominicano",
    DZD: "Dinar argelino",
    EGP: "Libra egipcia",
    ERN: "Nakfa eritreo",
    ETB: "Birr etíope",
    EUR: "Euro",
    FJD: "Dólar fiyiano",
    FKP: "Libra de las Islas Malvinas",
    FOK: "Corona feroesa",
    GBP: "Libra esterlina",
    GEL: "Lari georgiano",
    GGP: "Libra de Guernsey",
    GHS: "Cedi ghanés",
    GIP: "Libra de Gibraltar",
    GMD: "Dalasi gambiano",
    GNF: "Franco guineano",
    GTQ: "Quetzal guatemalteco",
    GYD: "Dólar guyanés",
    HKD: "Dólar de Hong Kong",
    HNL: "Lempira hondureño",
    HRK: "Kuna croata",
    HTG: "Gourde haitiano",
    HUF: "Forinto húngaro",
    IDR: "Rupia indonesia",
    ILS: "Nuevo shéquel israelí",
    IMP: "Libra manesa",
    INR: "Rupia india",
    IQD: "Dinar iraquí",
    IRR: "Rial iraní",
    ISK: "Corona islandesa",
    JEP: "Libra de Jersey",
    JMD: "Dólar jamaiquino",
    JOD: "Dinar jordano",
    JPY: "Yen japonés",
    KES: "Chelín keniano",
    KGS: "Som kirguís",
    KHR: "Riel camboyano",
    KID: "Dólar de Kiribati",
    KMF: "Franco comorense",
    KRW: "Won surcoreano",
    KWD: "Dinar kuwaití",
    KYD: "Dólar caimanés",
    KZT: "Tenge kazajo",
    LAK: "Kip laosiano",
    LBP: "Libra libanesa",
    LKR: "Rupia de Sri Lanka",
    LRD: "Dólar liberiano",
    LSL: "Loti lesotense",
    LYD: "Dinar libio",
    MAD: "Dírham marroquí",
    MDL: "Leu moldavo",
    MGA: "Ariary malgache",
    MKD: "Denar macedonio",
    MMK: "Kyat birmano",
    MNT: "Tugrik mongol",
    MOP: "Pataca de Macao",
    MRU: "Ouguiya mauritano",
    MUR: "Rupia mauricia",
    MVR: "Rupia maldiva",
    MWK: "Kwacha malauí",
    MXN: "Peso mexicano",
    MYR: "Ringgit malayo",
    MZN: "Metical mozambiqueño",
    NAD: "Dólar namibio",
    NGN: "Naira nigeriana",
    NIO: "Córdoba nicaragüense",
    NOK: "Corona noruega",
    NPR: "Rupia nepalesa",
    NZD: "Dólar neozelandés",
    OMR: "Rial omaní",
    PAB: "Balboa panameño",
    PEN: "Sol peruano",
    PGK: "Kina papú",
    PHP: "Peso filipino",
    PKR: "Rupia pakistaní",
    PLN: "Złoty polaco",
    PYG: "Guaraní paraguayo",
    QAR: "Rial catarí",
    RON: "Leu rumano",
    RSD: "Dinar serbio",
    RUB: "Rublo ruso",
    RWF: "Franco ruandés",
    SAR: "Riyal saudí",
    SBD: "Dólar de las Islas Salomón",
    SCR: "Rupia seychelense",
    SDG: "Libra sudanesa",
    SEK: "Corona sueca",
    SGD: "Dólar de Singapur",
    SHP: "Libra de Santa Elena",
    SLE: "Leone de Sierra Leona",
    SOS: "Chelín somalí",
    SRD: "Dólar surinamés",
    SSP: "Libra sursudanesa",
    STN: "Dobra de Santo Tomé y Príncipe",
    SYP: "Libra siria",
    SZL: "Lilangeni suazi",
    THB: "Baht tailandés",
    TJS: "Somoni tayiko",
    TMT: "Manat turcomano",
    TND: "Dinar tunecino",
    TOP: "Paʻanga tongano",
    TRY: "Lira turca",
    TTD: "Dólar de Trinidad y Tobago",
    TVD: "Dólar tuvaluano",
    TWD: "Nuevo dólar taiwanés",
    TZS: "Chelín tanzano",
    UAH: "Grivna ucraniana",
    UGX: "Chelín ugandés",
    USD: "Dólar estadounidense",
    UYU: "Peso uruguayo",
    UZS: "Som uzbeko",
    VES: "Bolívar soberano venezolano",
    VND: "Dong vietnamita",
    VUV: "Vatu vanuatuense",
    WST: "Tala samoano",
    XAF: "Franco CFA de África Central",
    XCD: "Dólar del Caribe Oriental",
    XDR: "Derechos especiales de giro",
    XOF: "Franco CFA de África Occidental",
    XPF: "Franco CFP",
    YER: "Rial yemení",
    ZAR: "Rand sudafricano",
    ZMW: "Kwacha zambiano",
    ZWL: "Dólar zimbabuense"
  };
  code: string | null = "";
  fb=inject(FormBuilder)
  ers=inject(ExchangeRateService)
  activatedRoute=inject(ActivatedRoute)
  formulario=this.fb.nonNullable.group({
    "baseCurrency":["",[Validators.required,this.validateCurrency.bind(this)]],
    "targetCurrency":["",[Validators.required,this.validateCurrency.bind(this)]],
    "amount":[0,[Validators.required,Validators.min(1)]]
  })

  

  ngOnInit(): void {
    this.ers.getExchangeRates("ARS").subscribe({
      next:(response:CurrencyERA)=>{
        this.currencykeys=Object.keys(response.conversion_rates)
      }
    })

    this.activatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.code=params.get("moneda")
        console.log(this.code);
        if(this.code!=null){
          this.formulario.controls["baseCurrency"].setValue(this.code);
        }
      },
      error:(e:Error)=>{
        console.log(e.message);
      }
    })

  }

  convertCurrency(): void {
    const formControls=this.formulario.controls
    if(formControls.baseCurrency.hasError("required")){
      alert("La moneda base es obligatoria")
      return;
    }else if (formControls.baseCurrency.hasError('invalidCurrency')) {
      alert('La moneda base no es válida.');
      return;
    }

    if (formControls.targetCurrency.hasError('required')) {
      alert('La moneda objetivo es obligatoria.');
      return;
    } else if (formControls.targetCurrency.hasError('invalidCurrency')) {
      alert('La moneda objetivo no es válida.');
      return;
    }

    if (formControls.amount.hasError('required')) {
      alert('El monto es obligatorio.');
      return;
    } else if (formControls.amount.hasError("min")){
      alert("El monto debe ser mayor a 0")
      return;
    }

    

    const formResults=this.formulario.getRawValue()
    this.baseCurrency=formResults.baseCurrency
    this.targetCurrency=formResults.targetCurrency
    this.amount=formResults.amount

    this.ers.convert(this.baseCurrency, this.targetCurrency).subscribe((data) => {
      const rate = data.conversion_rate;
      this.convertedAmount = this.amount * rate;
      this.escribirMensaje()
    });
  }

  validateCurrency(control: AbstractControl) {
    const value = control.value;
    if (!this.currencykeys.includes(value)) {
      return { invalidCurrency: true };
    }
    return null;
  }


  calcularFechaActual() {
    const now = new Date();
    const formattedDate = format(now, "dd/MM/yyyy 'a las' HH:mm:ss")
    return formattedDate;
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.message).then(
      () => {
        // Cambiar visualmente el ícono para indicar éxito
        alert('¡Mensaje copiado al portapapeles!'); // Puedes reemplazar esto con una notificación visual más elegante.
      },
      (err) => {
        console.error('Error al copiar al portapapeles: ', err);
      }
    );
  }

  

  escribirMensaje(){
    this.message = `Al dia de hoy, ${this.calcularFechaActual()}, ${this.amount.toFixed(2)} ${this.baseCurrency} equivalen a ${this.convertedAmount!.toFixed(2)} ${this.targetCurrency}`;
  }


}