package beans;

import java.util.ArrayList;

public class Kupac extends Korisnik {
	private double sakupljeniBodovi;
	private  ArrayList<Karta> karte;
	private TipKupca tip;
	private boolean izbrisan;
	private boolean blokiran;
	private ArrayList<String>tempReservedTypes;
		
	
	public Kupac(String korisnickoIme,String lozinka,String ime,String prezime, String pol,
			String datumRodjenja) {
		super(korisnickoIme, lozinka, ime, prezime, pol, datumRodjenja);
		this.sakupljeniBodovi = 0;
		this.karte = new ArrayList<>();;
		this.tip = new TipKupca("Bronze");
		this.izbrisan = false;
		this.blokiran = false;
		this.tempReservedTypes = new ArrayList<String>();
	}
	
	public boolean isIzbrisan() {
		return izbrisan;
	}
	public void setIzbrisan(boolean izbrisan) {
		this.izbrisan = izbrisan;
	}
	public boolean isBlokiran() {
		return blokiran;
	}
	public void setBlokiran(boolean blokiran) {
		this.blokiran = blokiran;
	}
	public double getSakupljeniBodovi() {
		return sakupljeniBodovi;
	}
	public Kupac() {
		super();
		this.karte=new ArrayList<>();
		
	}
	public void setSakupljeniBodovi(double sakupljeniBodovi) {
		this.sakupljeniBodovi = sakupljeniBodovi;
	}
	public ArrayList<Karta> getKarte() {
		return karte;
	}
	public void setKarte(ArrayList<Karta> karte) {
		this.karte = karte;
	}
	public TipKupca getTip() {
		return tip;
	}
	public void setTip(TipKupca tip) {
		this.tip = tip;
	}
	public void addKarta(Karta karta) {
		this.karte.add(karta);
		
	}

	public ArrayList<String> getTempReservedTypes() {
		return tempReservedTypes;
	}

	public void setTempReservedTypes(ArrayList<String> tempReservedTypes) {
		this.tempReservedTypes = tempReservedTypes;
	}
	
	public void addToTemp(String s) {
		this.tempReservedTypes.add(s);
	}
	
	public void removeOneTemp(String s) {
		this.tempReservedTypes.remove(s);
	}
	
}
