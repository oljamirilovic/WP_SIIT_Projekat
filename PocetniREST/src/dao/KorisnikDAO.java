package dao;

import java.util.Collection;

import beans.Korisnik;
import beans.Prodavac;

public abstract class KorisnikDAO {
	private String ContextPath;

	public String getContextPath() {
		return ContextPath;
	}

	public void setContextPath(String contextPath) {
		ContextPath = contextPath;
	}
	
	public abstract Collection<Korisnik> findAll();
	
	public abstract Korisnik addUser(Korisnik korisnik);
	public abstract Korisnik find(String korisnickoIme);

}
