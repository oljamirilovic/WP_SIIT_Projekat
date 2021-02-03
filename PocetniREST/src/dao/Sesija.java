package dao;

import java.io.IOException;

public class Sesija {
	private AdministratorDao administratorDAO;
	private KartaDAO kartaDAO;
	private KomentarDAO komentarDAO;
	private KupacDAO kupacDAO;
	private LokacijaDAO lokacijaDAO;
	private ManifestacijaDAO manifestacijaDAO;
	private ProdavacDAO prodavacDAO;
	public AdministratorDao getAdministratorDAO() {
		return administratorDAO;
	}
	public void setAdministratorDAO(AdministratorDao administratorDAO) {
		this.administratorDAO = administratorDAO;
	}
	public KartaDAO getKartaDAO() {
		return kartaDAO;
	}
	public void setKartaDAO(KartaDAO kartaDAO) {
		this.kartaDAO = kartaDAO;
	}
	public KomentarDAO getKomentarDAO() {
		return komentarDAO;
	}
	public void setKomentarDAO(KomentarDAO komentarDAO) {
		this.komentarDAO = komentarDAO;
	}
	public KupacDAO getKupacDAO() {
		return kupacDAO;
	}
	public void setKupacDAO(KupacDAO kupacDAO) {
		this.kupacDAO = kupacDAO;
	}
	public LokacijaDAO getLokacijaDAO() {
		return lokacijaDAO;
	}
	public void setLokacijaDAO(LokacijaDAO lokacijaDAO) {
		this.lokacijaDAO = lokacijaDAO;
	}
	public ManifestacijaDAO getManifestacijaDAO() {
		return manifestacijaDAO;
	}
	public void setManifestacijaDAO(ManifestacijaDAO manifestacijaDAO) {
		this.manifestacijaDAO = manifestacijaDAO;
	}
	public ProdavacDAO getProdavacDAO() {
		return prodavacDAO;
	}
	public void setProdavacDAO(ProdavacDAO prodavacDAO) {
		this.prodavacDAO = prodavacDAO;
	}
	
	public void ucitavanje() {
		//this.administratorDAO=new AdministratorDao();
		//this.prodavacDAO=new ProdavacDAO();
		//this.kupacDAO=new KupacDAO();
		this.lokacijaDAO=new LokacijaDAO();
		//this.manifestacijaDAO=new ManifestacijaDAO();
		this.kartaDAO=new KartaDAO();
		//this.komentarDAO=new KomentarDAO();	
		//i jos tip karte
		
		
	}
	public void sacuvaj() {
		/*try {
			this.komentarDAO.generateJSON();
		
		this.kartaDAO.generateJSON();
		this.manifestacijaDAO.generateJSON();
		this.lokacijaDAO.generateJSON(); //TODO: razmisliti o lokacijama???
	//	this.kupacDAO.generateJSON();
		this.prodavacDAO.generateJSON();
		this.administratorDAO.generateJSON();
		} catch (IOException e) {
			
			System.out.print("Error with saving files");
		}*/
		
	}

}
