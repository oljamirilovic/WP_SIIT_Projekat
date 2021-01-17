package beans;

import java.util.ArrayList;

public class Kupac extends Korisnik {
	private int sakupljeniBodovi;
	private  ArrayList<Karta> karte;
	private TipKupca tip;
	private boolean izbrisan;
	private boolean blokiran;
	
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
	public int getSakupljeniBodovi() {
		return sakupljeniBodovi;
	}
	public Kupac() {
		super();
	}
	public void setSakupljeniBodovi(int sakupljeniBodovi) {
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
	
	
}
