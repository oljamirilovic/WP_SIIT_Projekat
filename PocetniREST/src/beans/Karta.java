package beans;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class Karta {
	private Kupac kupac;
	private String id;
	private Manifestacija manifestacija;
	private LocalDate datum;
	private double cena;
	private boolean status; //true rezervisana false odustanak
	private String tipKarte;
	private boolean izbrisana;
	private String korisnickoIme, nazivmanifestacije;
	
	
	public String getTipKarte() {
		return tipKarte;
	}
	public void setTipKarte(String tipKarte) {
		this.tipKarte = tipKarte;
	}
	public String getKorisnickoIme() {
		return korisnickoIme;
	}
	public void setKorisnickoIme(String korisnickoIme) {
		this.korisnickoIme = korisnickoIme;
	}
	public String getNazivmanifestacije() {
		return nazivmanifestacije;
	}
	public void setNazivmanifestacije(String nazivmanifestacije) {
		this.nazivmanifestacije = nazivmanifestacije;
	}
	public boolean isIzbrisana() {
		return izbrisana;
	}
	public void setIzbrisana(boolean izbrisana) {
		this.izbrisana = izbrisana;
	}
	public Kupac getKupac() {
		return kupac;
	}
	public void setKupac(Kupac kupac) {
		this.kupac = kupac;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Manifestacija getManifestacija() {
		return manifestacija;
	}
	public void setManifestacija(Manifestacija manifestacija) {
		this.manifestacija = manifestacija;
	}
	public LocalDate getDatum() {
		return datum;
	}
	public void setDatum(LocalDate datum) {
		this.datum = datum;
	}
	public double getCena() {
		return cena;
	}
	public void setCena(double cena) {
		this.cena = cena;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public String getTip() {
		return tipKarte;
	}
	public void setTip(String tip) {
		this.tipKarte = tip;
	}
	public Karta() {
		super();
	}
	

}
