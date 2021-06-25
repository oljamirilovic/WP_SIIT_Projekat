package beans;

import java.time.LocalDate;

public class Karta {
	private String id;
	private String datum;
	private double cena;
	private boolean status; //true rezervisana false odustanak
	private String tipKarte;
	private boolean izbrisana;
	private String korisnickoIme, nazivmanifestacije;
	private String cancellationDate;
	
	
	public Karta( String id, String datum, double cena, boolean status,
			String tipKarte, boolean izbrisana, String korisnickoIme, String nazivmanifestacije) {
		this.id = id;
		this.datum = datum;
		this.cena = cena;
		this.status = status;
		this.tipKarte = tipKarte;
		this.izbrisana = izbrisana;
		this.korisnickoIme = korisnickoIme;
		this.nazivmanifestacije = nazivmanifestacije;
	}
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
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getDatum() {
		return datum;
	}
	public void setDatum(String datum) {
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
	public Karta() {
		super();
	}
	public String getCancellationDate() {
		return cancellationDate;
	}
	public void setCancellationDate(String cancellationDate) {
		this.cancellationDate = cancellationDate;
	}
	
	public LocalDate getCancellationDateAsDate() {
		if(cancellationDate != "-") {
			try {
				return LocalDate.parse(cancellationDate);
			} catch (Exception e) {
				// TODO: handle exception
			}
			
		}
		return null;
	}
}
