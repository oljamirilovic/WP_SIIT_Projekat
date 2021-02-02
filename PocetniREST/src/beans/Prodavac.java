package beans;

import java.util.ArrayList;

public class Prodavac extends Korisnik {
	private boolean izbrisan;
	private boolean nlokiran;
	private ArrayList<Manifestacija> manifestacije; //samo one koje je on namestio

	public ArrayList<Manifestacija> getManifestacije() {
		return manifestacije;
	}

	public void setManifestacije(ArrayList<Manifestacija> manifestacije) {
		this.manifestacije = manifestacije;
	}

	public Prodavac() {
		super();
		this.manifestacije=new ArrayList<>();
	}

	public boolean isIzbrisan() {
		return izbrisan;
	}

	public void setIzbrisan(boolean izbrisan) {
		this.izbrisan = izbrisan;
	}

	public boolean isNlokiran() {
		return nlokiran;
	}

	public void setNlokiran(boolean nlokiran) {
		this.nlokiran = nlokiran;
	}
	
	

}
