package beans;

import java.time.LocalDate;
import java.util.HashMap;

public class Manifestacija {
	private String naziv;
	private String tipManifestacije;
	private int brojMesta;
	private String datumPocetka;
	private String datumKraja;
	private String vremePocetka;
	private String vremeKraja;
	private double cenaKarte;
	private boolean status;
	private Lokacija lokacija;
	private boolean izbrisana;	
	private String poster;
	private String prodavac;
	private int preostaloRegular;
	private int preostaloVip;
	private int preostaloFanpit;
		
	public Manifestacija(String naziv, String tipManifestacije, int brojMesta, String datumPocetka, String datumKraja,String vremePocetka,String vremeKraja,
			double cenaKarte, boolean status, Lokacija lokacija, boolean izbrisana, String poster,int preostaloRegular, int preostaloVip, int preostaloFanpit) {
		super();
		this.naziv = naziv;
		this.tipManifestacije = tipManifestacije;
		this.brojMesta = brojMesta;
		this.datumPocetka = datumPocetka;
		this.datumKraja = datumKraja;
		this.vremePocetka = vremePocetka;
		this.vremeKraja = vremeKraja;
		this.cenaKarte = cenaKarte;
		this.status = status;
		this.lokacija = lokacija;
		this.izbrisana = izbrisana;
		this.poster = poster;
		this.preostaloRegular = preostaloRegular;
		this.preostaloVip = preostaloVip;
		this.preostaloFanpit = preostaloFanpit;
	}
	
	public boolean isIzbrisana() {
		return izbrisana;
	}
	public void setIzbrisana(boolean izbrisana) {
		this.izbrisana = izbrisana;
	}
		
	public String getPoster() {
		return poster;
	}
	public void setPoster(String poster) {
		this.poster = poster;
	}
	
	public String getProdavac() {
		return prodavac;
	}
	public void setProdavac(String poster) {
		this.prodavac = poster;
	}
	
	public String getNaziv() {
		return naziv;
	}
	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	public String getTipManifestacije() {
		return tipManifestacije;
	}
	public void setTipManifestacije(String tipManifestacije) {
		this.tipManifestacije = tipManifestacije;
	}
	public int getBrojMesta() {
		return brojMesta;
	}
	public void setBrojMesta(int brojMesta) {
		this.brojMesta = brojMesta;
	}
	public double getCenaKarte() {
		return cenaKarte;
	}
	public void setCenaKarte(double cenaKarte) {
		this.cenaKarte = cenaKarte;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public Lokacija getLokacija() {
		return lokacija;
	}
	public void setLokacija(Lokacija lokacija) {
		this.lokacija = lokacija;
	}
	public String getDatumPocetka() {
		return datumPocetka;
	}

	public void setDatumPocetka(String datumPocetka) {
		this.datumPocetka = datumPocetka;
	}

	public String getDatumKraja() {
		return datumKraja;
	}

	public void setDatumKraja(String datumKraja) {
		this.datumKraja = datumKraja;
	}

	public String getVremePocetka() {
		return vremePocetka;
	}

	public void setVremePocetka(String vremePocetka) {
		this.vremePocetka = vremePocetka;
	}

	public String getVremeKraja() {
		return vremeKraja;
	}

	public void setVremeKraja(String vremeKraja) {
		this.vremeKraja = vremeKraja;
	}

	public int getPreostaloRegular() {
		return preostaloRegular;
	}

	public void setPreostaloRegular(int preostaloRegular) {
		this.preostaloRegular = preostaloRegular;
	}

	public int getPreostaloVip() {
		return preostaloVip;
	}

	public void setPreostaloVip(int preostaloVip) {
		this.preostaloVip = preostaloVip;
	}

	public int getPreostaloFanpit() {
		return preostaloFanpit;
	}

	public void setPreostaloFanpit(int preostaloFanpit) {
		this.preostaloFanpit = preostaloFanpit;
	}

	public Manifestacija() {
		super();
	}

	public Manifestacija(HashMap<String, String> event1) {
		// //{fan=3, datumVreme=2021-06-20, brojMesta=3, cenaKarte=3444, naziv=f, tip=3, vip=3, krajProslave=2021-06-26}
		int fanMesto=Integer.parseInt(event1.get("fan"));
		int vipMesto=Integer.parseInt(event1.get("vip"));
		int obicnoMesto=Integer.parseInt(event1.get("brojMesta"));
		int cena=Integer.parseInt(event1.get("cenaKarte"));
		String tip=event1.get("tip");
		String naziv=event1.get("naziv");
		double gsirina=Double.parseDouble(event1.get("gsirina"));
		double gduzina=Double.parseDouble(event1.get("gduzina"));
		//TODO pocetak i kraj
		this.datumPocetka=event1.get("datumVreme");
		this.datumKraja=event1.get("krajProslave");
		this.brojMesta=obicnoMesto+fanMesto+vipMesto;//ako je ovo ukupno??
		this.naziv=naziv;
		this.cenaKarte=cena;
		this.preostaloFanpit=fanMesto; //TODO , da li da imamo inicijalizovano, ili  na koji  nacin posle u toku rada da proverimo koliko ima mesta ukupno??
		this.preostaloVip=vipMesto;
		this.preostaloRegular=obicnoMesto;
		this.tipManifestacije=tip;
		this.vremePocetka=event1.get("pocetakV");
		this.vremeKraja=event1.get("pocetakK");
		this.prodavac=event1.get("user");
		this.status=false;
		this.izbrisana=false;
		if(event1.containsKey("slika")) {
			if(!event1.get("slika").equals("")) {
		this.poster=event1.get("slika").split("base64,")[1];
		this.poster=this.poster.substring(0, this.poster.length()-2);
		System.out.println(this.poster);}}
		this.setLokacija(new Lokacija(gduzina, gsirina, event1.get("road"),event1.get("city"),event1.get("postcode"),event1.get("nu")));
	}


}
