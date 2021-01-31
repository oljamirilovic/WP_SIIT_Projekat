package beans;

public class Komentar {
	private int id;
	private Kupac kupac;
	private Manifestacija manifestacija;
	private String text;
	private int ocena;
	private boolean odobren;
	private boolean obrisan;
	private String imeKupca;//korisnicko ime kupca
	private String imeManifestacije;
	
	
	
	public String getImeKupca() {
		return imeKupca;
	}
	public void setImeKupca(String imeKupca) {
		this.imeKupca = imeKupca;
	}
	public String getImeManifestacije() {
		return imeManifestacije;
	}
	public void setImeManifestacije(String imeManifestacije) {
		this.imeManifestacije = imeManifestacije;
	}
	public boolean isOdobren() {
		return odobren;
	}
	public void setOdobren(boolean odobren) {
		this.odobren = odobren;
	}
	public boolean isObrisan() {
		return obrisan;
	}
	public void setObrisan(boolean obrisan) {
		this.obrisan = obrisan;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Kupac getKupac() {
		return kupac;
	}
	public void setKupac(Kupac kupac) {
		this.kupac = kupac;
	}
	public Manifestacija getManifestacija() {
		return manifestacija;
	}
	public void setManifestacija(Manifestacija manifestacija) {
		this.manifestacija = manifestacija;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public int getOcena() {
		return ocena;
	}
	public void setOcena(int ocena) {
		this.ocena = ocena;
	}
	public Komentar() {
		super();
		this.odobren=false;
		this.obrisan=false;
	}
	

}
