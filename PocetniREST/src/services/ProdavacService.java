package services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;


import beans.Karta;
import beans.Kupac;
import beans.Manifestacija;
import beans.Prodavac;
import dao.KartaDAO;
import dao.ManifestacijaDAO;
import dao.KupacDAO;
import dao.ProdavacDAO;

@Path("/salesmen")
public class ProdavacService {
	
	@Context
	ServletContext ctx;
	@Context
	HttpServletRequest request;	

	public ProdavacService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("salesmenDAO")==null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("salesmenDAO", new ProdavacDAO(contextPath)); 
			ctx.setAttribute("ticketsDAO", new KartaDAO(contextPath)); 
			ctx.setAttribute("customersDAO", new KupacDAO(contextPath)); 
			ctx.setAttribute("eventsDAO", new ManifestacijaDAO(contextPath)); 
		}
	}
	
	@GET
	@Path("/getSalesman")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Prodavac> getSalesman(){
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("salesmenDAO");
		Collection<Prodavac> us = dao.findAll();
		if(us == null) {
			dao = new ProdavacDAO(ctx.getRealPath("")); 
			ctx.setAttribute("salesmenDAO", dao);
		}
		return us;
	}
	
	@POST
	@Path("/searchUsername")
	@Consumes({  MediaType.TEXT_PLAIN, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Prodavac searchUsername(String name) {
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("salesmenDAO");
		
		String s = name.substring(7, name.length()-2);
		Prodavac user = dao.find(s);
		
		return user;
	}
	
	@POST
	@Path("/setCurrentSalesmen")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public void setCurrentSalesmen(Prodavac m) {
		ctx.setAttribute("currentSalesmen", m); 
		
	}
	
	@GET
	@Path("/getCurrentSalesmen")
	@Produces(MediaType.APPLICATION_JSON)
	public Prodavac getCurrentSalesmen(){
		Prodavac m = (Prodavac)ctx.getAttribute("currentSalesmen");
		return m;
	}
	
	@POST
	@Path("/add")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Prodavac add(HashMap<String,String> user) {
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("salesmenDAO");
		System.out.println("da ovde je");
		System.out.println(user);
		Prodavac retVal = dao.addProdavac(user);
		String contextPath = ctx.getRealPath("");
		try {
			dao.generateJSON(contextPath);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		ctx.setAttribute("salesmenDAO", dao);
		return retVal;
	}


	/*@GET
	@Path("/search")
	@Consumes({  MediaType.TEXT_PLAIN, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Prodavac search(String lastname) {
		//TODO: razmisli
		return null;
		/*UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.findAll().stream().filter(user -> user.getPrezime()
				.equals(lastname)).findFirst().orElse(null);*/

	//}



	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Prodavac> getProdavci() {
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("salesmenDAO");
		return dao.findAll();
	}

	@GET
	@Path("/manifestacije")
	@Consumes({  MediaType.TEXT_PLAIN, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Manifestacija> getManifestacijeOfProdavac() {
		System.out.println("nnnnn");
		Prodavac p=(Prodavac)(Prodavac)ctx.getAttribute("currentSalesmen");
		System.out.println("nnnnn");
		System.out.println(p);
		//ManifestacijaDAO mDao=(ManifestacijaDAO)ctx.getAttribute("ManifestacijeDAO");
		
		return null;//mDao.findByUsername(m.getUsername());
	}
	@GET
	@Path("/myEvents1")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Manifestacija> getEventsOfProdavac(){//String username) {
		System.out.println("n");
		Prodavac p=(Prodavac)(Prodavac)ctx.getAttribute("currentSalesmen");
		if(p!=null) {
		ManifestacijaDAO manDAO=(ManifestacijaDAO)ctx.getAttribute("eventsDAO");
		ArrayList<Manifestacija> sveMan=(ArrayList<Manifestacija>) manDAO.findByUsername(p.getKorisnickoIme());
		p.setManifestacije(sveMan);
		System.out.println("n");
		return p.getManifestacije();}return null;
	}

	@GET
	@Path("/myConsumers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<String> getKupciOfProdavac(){//String username) {
		System.out.println("n");
		Prodavac p=(Prodavac)(Prodavac)ctx.getAttribute("currentSalesmen");
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("salesmenDAO");
		KartaDAO dao2=(KartaDAO) ctx.getAttribute("ticketsDAO");
		if(dao2!=null) {
			System.out.print("d");
			return dao.nadjiKupce("pedja", dao2.getKarte().values());
		}
		return null;
	}
	
	
	
	
	@GET
	@Path("/myConsumersAll")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Kupac> getKupciOdProdavca(){//String username) {
		System.out.println("n");
		Prodavac p=(Prodavac)(Prodavac)ctx.getAttribute("currentSalesmen");
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("salesmenDAO");
		KartaDAO dao2=(KartaDAO) ctx.getAttribute("ticketsDAO");
		KupacDAO dao3=(KupacDAO) ctx.getAttribute("customersDAO");
		ManifestacijaDAO manDAO=(ManifestacijaDAO)ctx.getAttribute("eventsDAO");
		if(p!=null) {
		ArrayList<Manifestacija> sveMan=(ArrayList<Manifestacija>) manDAO.findByUsername(p.getKorisnickoIme());
		p.setManifestacije(sveMan);
		System.out.print("natasa");
		if(dao2!=null && dao3!=null && p!=null) {
			System.out.print("d");
			return dao.nadjiCeleKupce(p, dao2.getKarte().values(), dao3.findAll());
		}System.out.print("f");}//TODO ne ostavljaj ovako
		return null;
	}
	
	
	
	
	
	@GET
	@Path("/pregledRezervisanihKarata")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Collection<Karta> getKarteiOfProdavac(String username) {
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("salesmenDAO");
		KartaDAO dao2=(KartaDAO) ctx.getAttribute("ticketsDAO");
		if(dao2!=null) {
			return dao.nadjiKarte(username, dao2.getKarte().values());}
		return null;
	}
	
	@PUT
	@Path("/blokiraj")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public void blokiraj(Prodavac prodavac) {
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("salesmenDAO");
		dao.blokiraj(prodavac);
	}
	@DELETE
	@Path("/obrisi")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public void obrisi(Prodavac prodavac) {
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("salesmenDAO");
		//dao.obrisi(prodavac);
	}

	@POST
	@Path("/exists")
	@Consumes({ MediaType.TEXT_PLAIN, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Prodavac findOne(HashMap<String, String> username) {
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("salesmenDAO");
		System.out.println(username.getClass());
		System.out.print(dao.getClass());//ovo jeste hes mapa
		System.out.print(dao);
		Prodavac u = dao.find(username.get("id"));//ovde izadje greska null
		return u;
	}
		
	@POST
	@Path("/saveProfileChanges")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces(MediaType.APPLICATION_JSON)
	public Prodavac saveProfileChanges(Prodavac user) {
		Prodavac k = (Prodavac)ctx.getAttribute("currentSalesmen");
		k.setDatumRodjenja(user.getDatumRodjenja());
		k.setIme(user.getIme());
		k.setLozinka(user.getLozinka());
		k.setPol(user.getPol());
		k.setPrezime(user.getPrezime());
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("salesmenDAO");
		ctx.setAttribute("currentSalesmen", k); 
		dao.updateOne(k);
		ctx.setAttribute("salesmenDAO", dao);
		try {
			dao.generateJSON(ctx.getRealPath(""));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return k;
	}
	
	@POST
	@Path("/delete")
	@Consumes({  MediaType.TEXT_PLAIN, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public void delete(String username) {
		String s = username.substring(7, username.length()-2);
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("salesmenDAO");
		Prodavac k = dao.find(s);
		k.setIzbrisan(true);
		dao.updateOne(k);
		ctx.setAttribute("salesmenDAO", dao);
		try {
			dao.generateJSON(ctx.getRealPath(""));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
	}
	
	@POST
	@Path("/undoBlocking")
	@Consumes({  MediaType.TEXT_PLAIN, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public void undoBlocking(String username) {
		String s = username.substring(7, username.length()-2);
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("salesmenDAO");
		Prodavac k = dao.find(s);
		k.setBlokiran(false);
		dao.updateOne(k);
		ctx.setAttribute("salesmenDAO", dao);
		try {
			dao.generateJSON(ctx.getRealPath(""));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
	}
	
	@POST
	@Path("/block")
	@Consumes({  MediaType.TEXT_PLAIN, MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public void block(String username) {
		String s = username.substring(7, username.length()-2);
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("salesmenDAO");
		Prodavac k = dao.find(s);
		k.setBlokiran(true);
		dao.updateOne(k);
		ctx.setAttribute("salesmenDAO", dao);
		try {
			dao.generateJSON(ctx.getRealPath(""));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
	}

}
