package beans;

import java.time.LocalDate;
import java.time.LocalDateTime;

public abstract class Korisnik {
	private String korisnickoIme, lozinka, ime, prezime;
	private String pol;
	private LocalDate datumRodjenja;
	public Korisnik() {
		super();
	}
	public String getKorisnickoIme() {
		return korisnickoIme;
	}
	public void setKorisnickoIme(String korisnickoIme) {
		this.korisnickoIme = korisnickoIme;
	}
	public String getLozinka() {
		return lozinka;
	}
	public void setLozinka(String lozinka) {
		this.lozinka = lozinka;
	}
	public String getIme() {
		return ime;
	}
	public void setIme(String ime) {
		this.ime = ime;
	}
	public String getPrezime() {
		return prezime;
	}
	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}
	public String getPol() {
		return pol;
	}
	public void setPol(String pol) {
		this.pol = pol;
	}
	public LocalDate getDatumRodjenja() {
		return datumRodjenja;
	}
	public void setDatumRodjenja(LocalDate datumRodjenja) {
		this.datumRodjenja = datumRodjenja;
	}
	
	

}
