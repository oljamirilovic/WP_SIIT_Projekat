package beans;

import java.time.LocalDateTime;

public class Manifestacija {
	private String naziv;
	private TipManifestacije tipManifestacije;
	private int brojMesta;
	private LocalDateTime datumVreme;
	private double cenaKarte;
	private boolean status;
	private Lokacija lokacija;
	private boolean izbrisana;	
	private String poster;
		
	public Manifestacija(String naziv, TipManifestacije tipManifestacije, int brojMesta, LocalDateTime datumVreme,
			double cenaKarte, boolean status, Lokacija lokacija, boolean izbrisana, String poster) {
		super();
		this.naziv = naziv;
		this.tipManifestacije = tipManifestacije;
		this.brojMesta = brojMesta;
		this.datumVreme = datumVreme;
		this.cenaKarte = cenaKarte;
		this.status = status;
		this.lokacija = lokacija;
		this.izbrisana = izbrisana;
		this.poster = poster;
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
	
	public String getNaziv() {
		return naziv;
	}
	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	public TipManifestacije getTipManifestacije() {
		return tipManifestacije;
	}
	public void setTipManifestacije(TipManifestacije tipManifestacije) {
		this.tipManifestacije = tipManifestacije;
	}
	public int getBrojMesta() {
		return brojMesta;
	}
	public void setBrojMesta(int brojMesta) {
		this.brojMesta = brojMesta;
	}
	public LocalDateTime getDatumVreme() {
		return datumVreme;
	}
	public void setDatumVreme(LocalDateTime datumVreme) {
		this.datumVreme = datumVreme;
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
	public Manifestacija() {
		super();
	}


}
