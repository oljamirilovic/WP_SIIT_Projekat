package beans;

import java.util.ArrayList;

public class Prodavac extends Korisnik {
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
	
	

}
