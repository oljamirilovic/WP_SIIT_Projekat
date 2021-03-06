package beans;

import java.util.ArrayList;
import java.util.HashMap;

public class Prodavac extends Korisnik {
	private boolean izbrisan;
	private boolean blokiran;
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

	public Prodavac(HashMap<String, String> user) {//{date=1999-01-01, lastName=e, password=, gender=male, name=e, username=e}
		super(user.get("username"),user.get("password"),user.get("name"),user.get("lastName"),user.get("gender"),user.get("date"));
		this.izbrisan=false;
		this.blokiran=false;
		this.manifestacije=new ArrayList<>();
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

	public void setBlokiran(boolean nlokiran) {
		this.blokiran = nlokiran;
	}
	
	

}
