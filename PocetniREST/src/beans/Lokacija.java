package beans;

public class Lokacija {
	private double geografskaDuzina;
	private double geografskaSirina;
	private String ulica,mesto,postanskiBroj,broj, drzava;
	//slika
	
	public double getGeografskaDuzina() {
		return geografskaDuzina;
	}
	public String getDrzava() {
		return drzava;
	}
	public void setDrzava(String drzava) {
		this.drzava = drzava;
	}
	public void setGeografskaDuzina(double geografskaDuzina) {
		this.geografskaDuzina = geografskaDuzina;
	}
	public double getGeografskaSirina() {
		return geografskaSirina;
	}
	public void setGeografskaSirina(double geografskaSirina) {
		this.geografskaSirina = geografskaSirina;
	}
	public String getUlica() {
		return ulica;
	}
	public void setUlica(String ulica) {
		this.ulica = ulica;
	}
	public String getMesto() {
		return mesto;
	}
	public void setMesto(String mesto) {
		this.mesto = mesto;
	}
	public String getPostanskiBroj() {
		return postanskiBroj;
	}
	public void setPostanskiBroj(String postanskiBroj) {
		this.postanskiBroj = postanskiBroj;
	}
	public String getBroj() {
		return broj;
	}
	public void setBroj(String broj) {
		this.broj = broj;
	}
	public Lokacija() {
		super();
	}
	
	public Lokacija(double gduzina, double gsirina) {
		this.geografskaDuzina=gduzina;
		this.geografskaSirina=gsirina;
	}
	public Lokacija(double gduzina, double gsirina, String put, String grad, String code, String br) {
		this.geografskaDuzina=gduzina;
		this.geografskaSirina=gsirina;
		this.ulica=put;
		this.mesto=grad;
		this.postanskiBroj=code;
		this.broj=br;
	}
	public String toString() {
		return ulica + ", " + broj + ", " + mesto + ", " + postanskiBroj;
	}
	
}
