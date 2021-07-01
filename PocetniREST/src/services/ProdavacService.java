package services;

import java.io.IOException;
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
			ctx.setAttribute("KartaDAO", new KartaDAO(contextPath)); 
			ctx.setAttribute("KupacDAO", new KupacDAO(contextPath)); 
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
		Prodavac retVal = dao.addUser(user);
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
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Collection<Manifestacija> getManifestacijeOfProdavac(String username) {
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("salesmenDAO");
		return dao.find(username).getManifestacije();
	}

	@GET
	@Path("/myConsumers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<String> getKupciOfProdavac(){//String username) {
		System.out.println("n");
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("salesmenDAO");
		KartaDAO dao2=(KartaDAO) ctx.getAttribute("KartaDAO");
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
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("salesmenDAO");
		KartaDAO dao2=(KartaDAO) ctx.getAttribute("KartaDAO");
		KupacDAO dao3=(KupacDAO) ctx.getAttribute("KupacDAO");
		if(dao2!=null && dao3!=null) {
			System.out.print("d");
			return dao.nadjiCeleKupce("pedja", dao2.getKarte().values(), dao3.findAll());
		}System.out.print("f");//TODO ne ostavljaj ovako
		return null;
	}
	
	
	
	
	
	@GET
	@Path("/pregledRezervisanihKarata")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Collection<Karta> getKarteiOfProdavac(String username) {
		ProdavacDAO dao = (ProdavacDAO) ctx.getAttribute("salesmenDAO");
		KartaDAO dao2=(KartaDAO) ctx.getAttribute("KartaDAO");
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
		dao.obrisi(prodavac);
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

}
