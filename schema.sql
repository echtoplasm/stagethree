--
-- PostgreSQL database dump
--

\restrict tzmzC522tDlbLLgWAJt2dExcohdb7QfAM3AtoNEgN959bKqpnBvqZhzZ3VubCSv

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: element_category_emc; Type: TABLE; Schema: public; Owner: zach
--

CREATE TABLE public.element_category_emc (
    id_emc integer NOT NULL,
    name_emc character varying(100) NOT NULL,
    created_at_emc timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.element_category_emc OWNER TO zach;

--
-- Name: element_category_emc_id_emc_seq; Type: SEQUENCE; Schema: public; Owner: zach
--

CREATE SEQUENCE public.element_category_emc_id_emc_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.element_category_emc_id_emc_seq OWNER TO zach;

--
-- Name: element_category_emc_id_emc_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zach
--

ALTER SEQUENCE public.element_category_emc_id_emc_seq OWNED BY public.element_category_emc.id_emc;


--
-- Name: element_placement_elp; Type: TABLE; Schema: public; Owner: zach
--

CREATE TABLE public.element_placement_elp (
    id_elp integer NOT NULL,
    id_stp_elp integer NOT NULL,
    id_elt_elp integer NOT NULL,
    position_x_elp numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    position_y_elp numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    position_z_elp numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    rotation_x_elp numeric(10,2) DEFAULT '0'::numeric,
    rotation_y_elp numeric(10,2) DEFAULT '0'::numeric,
    rotation_z_elp numeric(10,2) DEFAULT '0'::numeric,
    scale_x_elp numeric(10,2) DEFAULT '1'::numeric,
    scale_y_elp numeric(10,2) DEFAULT '1'::numeric,
    scale_z_elp numeric(10,2) DEFAULT '1'::numeric,
    created_at_elp timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.element_placement_elp OWNER TO zach;

--
-- Name: element_placement_elp_id_elp_seq; Type: SEQUENCE; Schema: public; Owner: zach
--

CREATE SEQUENCE public.element_placement_elp_id_elp_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.element_placement_elp_id_elp_seq OWNER TO zach;

--
-- Name: element_placement_elp_id_elp_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zach
--

ALTER SEQUENCE public.element_placement_elp_id_elp_seq OWNED BY public.element_placement_elp.id_elp;


--
-- Name: element_type_elt; Type: TABLE; Schema: public; Owner: zach
--

CREATE TABLE public.element_type_elt (
    id_elt integer NOT NULL,
    name_elt character varying(100) NOT NULL,
    description_elt text,
    id_img_elt integer,
    default_color_elt character varying(7),
    default_scale_x_elt real DEFAULT '0.25'::real,
    default_scale_y_elt real DEFAULT '0.25'::real,
    default_scale_z_elt real DEFAULT '0.25'::real,
    id_emc_elt integer
);


ALTER TABLE public.element_type_elt OWNER TO zach;

--
-- Name: element_type_elt_id_elt_seq; Type: SEQUENCE; Schema: public; Owner: zach
--

CREATE SEQUENCE public.element_type_elt_id_elt_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.element_type_elt_id_elt_seq OWNER TO zach;

--
-- Name: element_type_elt_id_elt_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zach
--

ALTER SEQUENCE public.element_type_elt_id_elt_seq OWNED BY public.element_type_elt.id_elt;


--
-- Name: image_img; Type: TABLE; Schema: public; Owner: zach
--

CREATE TABLE public.image_img (
    id_img integer NOT NULL,
    name_img character varying(255) NOT NULL,
    file_path_img character varying(500) NOT NULL,
    file_type_img character varying(50),
    created_at_img timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.image_img OWNER TO zach;

--
-- Name: image_img_id_img_seq; Type: SEQUENCE; Schema: public; Owner: zach
--

CREATE SEQUENCE public.image_img_id_img_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.image_img_id_img_seq OWNER TO zach;

--
-- Name: image_img_id_img_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zach
--

ALTER SEQUENCE public.image_img_id_img_seq OWNED BY public.image_img.id_img;


--
-- Name: input_channel_inc; Type: TABLE; Schema: public; Owner: zach
--

CREATE TABLE public.input_channel_inc (
    id_inc integer NOT NULL,
    id_stp_inc integer NOT NULL,
    channel_number_inc integer NOT NULL,
    instrument_name_inc character varying(255) NOT NULL,
    mic_type_inc character varying(100),
    notes_inc text,
    created_at_inc timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.input_channel_inc OWNER TO zach;

--
-- Name: input_channel_inc_id_inc_seq; Type: SEQUENCE; Schema: public; Owner: zach
--

CREATE SEQUENCE public.input_channel_inc_id_inc_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.input_channel_inc_id_inc_seq OWNER TO zach;

--
-- Name: input_channel_inc_id_inc_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zach
--

ALTER SEQUENCE public.input_channel_inc_id_inc_seq OWNED BY public.input_channel_inc.id_inc;


--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: zach
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE public.knex_migrations OWNER TO zach;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: zach
--

CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.knex_migrations_id_seq OWNER TO zach;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zach
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: zach
--

CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


ALTER TABLE public.knex_migrations_lock OWNER TO zach;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: zach
--

CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNER TO zach;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zach
--

ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;


--
-- Name: project_prj; Type: TABLE; Schema: public; Owner: zach
--

CREATE TABLE public.project_prj (
    id_prj integer NOT NULL,
    id_usr_prj integer NOT NULL,
    name_prj character varying(255) NOT NULL,
    description_prj text,
    created_at_prj timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at_prj timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.project_prj OWNER TO zach;

--
-- Name: project_prj_id_prj_seq; Type: SEQUENCE; Schema: public; Owner: zach
--

CREATE SEQUENCE public.project_prj_id_prj_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.project_prj_id_prj_seq OWNER TO zach;

--
-- Name: project_prj_id_prj_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zach
--

ALTER SEQUENCE public.project_prj_id_prj_seq OWNED BY public.project_prj.id_prj;


--
-- Name: role_rol; Type: TABLE; Schema: public; Owner: zach
--

CREATE TABLE public.role_rol (
    id_rol integer NOT NULL,
    name_rol character varying(50) NOT NULL,
    description_rol character varying(255),
    created_at_rol timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.role_rol OWNER TO zach;

--
-- Name: role_rol_id_rol_seq; Type: SEQUENCE; Schema: public; Owner: zach
--

CREATE SEQUENCE public.role_rol_id_rol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.role_rol_id_rol_seq OWNER TO zach;

--
-- Name: role_rol_id_rol_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zach
--

ALTER SEQUENCE public.role_rol_id_rol_seq OWNED BY public.role_rol.id_rol;


--
-- Name: stage_plot_stp; Type: TABLE; Schema: public; Owner: zach
--

CREATE TABLE public.stage_plot_stp (
    id_stp integer NOT NULL,
    id_prj_stp integer NOT NULL,
    id_stg_stp integer,
    name_stp character varying(255) NOT NULL,
    created_at_stp timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    gig_date_stp date,
    uuid_stp uuid NOT NULL
);


ALTER TABLE public.stage_plot_stp OWNER TO zach;

--
-- Name: stage_plot_stp_id_stp_seq; Type: SEQUENCE; Schema: public; Owner: zach
--

CREATE SEQUENCE public.stage_plot_stp_id_stp_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.stage_plot_stp_id_stp_seq OWNER TO zach;

--
-- Name: stage_plot_stp_id_stp_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zach
--

ALTER SEQUENCE public.stage_plot_stp_id_stp_seq OWNED BY public.stage_plot_stp.id_stp;


--
-- Name: stage_stg; Type: TABLE; Schema: public; Owner: zach
--

CREATE TABLE public.stage_stg (
    id_stg integer NOT NULL,
    id_ven_stg integer,
    name_stg character varying(255) NOT NULL,
    width_stg numeric(10,2) NOT NULL,
    depth_stg numeric(10,2) NOT NULL,
    height_stg numeric(10,2),
    created_at_stg timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    created_by_stg integer,
    is_public_stg boolean DEFAULT false,
    deleted_at_stg timestamp with time zone
);


ALTER TABLE public.stage_stg OWNER TO zach;

--
-- Name: stage_stg_id_stg_seq; Type: SEQUENCE; Schema: public; Owner: zach
--

CREATE SEQUENCE public.stage_stg_id_stg_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.stage_stg_id_stg_seq OWNER TO zach;

--
-- Name: stage_stg_id_stg_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zach
--

ALTER SEQUENCE public.stage_stg_id_stg_seq OWNED BY public.stage_stg.id_stg;


--
-- Name: state_sta; Type: TABLE; Schema: public; Owner: zach
--

CREATE TABLE public.state_sta (
    id_sta integer NOT NULL,
    name_sta character varying(100) NOT NULL,
    abbreviation_sta character varying(2) NOT NULL
);


ALTER TABLE public.state_sta OWNER TO zach;

--
-- Name: state_sta_id_sta_seq; Type: SEQUENCE; Schema: public; Owner: zach
--

CREATE SEQUENCE public.state_sta_id_sta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.state_sta_id_sta_seq OWNER TO zach;

--
-- Name: state_sta_id_sta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zach
--

ALTER SEQUENCE public.state_sta_id_sta_seq OWNED BY public.state_sta.id_sta;


--
-- Name: user_usr; Type: TABLE; Schema: public; Owner: zach
--

CREATE TABLE public.user_usr (
    id_usr integer NOT NULL,
    email_usr character varying(255) NOT NULL,
    password_hash_usr character varying(255) NOT NULL,
    first_name_usr character varying(255) NOT NULL,
    last_name_usr character varying(255) NOT NULL,
    is_active_usr boolean DEFAULT true NOT NULL,
    created_at_usr timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    id_rol_usr integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.user_usr OWNER TO zach;

--
-- Name: user_usr_id_usr_seq; Type: SEQUENCE; Schema: public; Owner: zach
--

CREATE SEQUENCE public.user_usr_id_usr_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_usr_id_usr_seq OWNER TO zach;

--
-- Name: user_usr_id_usr_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zach
--

ALTER SEQUENCE public.user_usr_id_usr_seq OWNED BY public.user_usr.id_usr;


--
-- Name: venue_ven; Type: TABLE; Schema: public; Owner: zach
--

CREATE TABLE public.venue_ven (
    id_ven integer NOT NULL,
    name_ven character varying(255) NOT NULL,
    address_ven character varying(255),
    city_ven character varying(100),
    id_sta_ven integer,
    capacity_ven integer,
    created_at_ven timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    created_by_ven integer
);


ALTER TABLE public.venue_ven OWNER TO zach;

--
-- Name: venue_ven_id_ven_seq; Type: SEQUENCE; Schema: public; Owner: zach
--

CREATE SEQUENCE public.venue_ven_id_ven_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.venue_ven_id_ven_seq OWNER TO zach;

--
-- Name: venue_ven_id_ven_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zach
--

ALTER SEQUENCE public.venue_ven_id_ven_seq OWNED BY public.venue_ven.id_ven;


--
-- Name: element_category_emc id_emc; Type: DEFAULT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.element_category_emc ALTER COLUMN id_emc SET DEFAULT nextval('public.element_category_emc_id_emc_seq'::regclass);


--
-- Name: element_placement_elp id_elp; Type: DEFAULT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.element_placement_elp ALTER COLUMN id_elp SET DEFAULT nextval('public.element_placement_elp_id_elp_seq'::regclass);


--
-- Name: element_type_elt id_elt; Type: DEFAULT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.element_type_elt ALTER COLUMN id_elt SET DEFAULT nextval('public.element_type_elt_id_elt_seq'::regclass);


--
-- Name: image_img id_img; Type: DEFAULT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.image_img ALTER COLUMN id_img SET DEFAULT nextval('public.image_img_id_img_seq'::regclass);


--
-- Name: input_channel_inc id_inc; Type: DEFAULT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.input_channel_inc ALTER COLUMN id_inc SET DEFAULT nextval('public.input_channel_inc_id_inc_seq'::regclass);


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);


--
-- Name: project_prj id_prj; Type: DEFAULT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.project_prj ALTER COLUMN id_prj SET DEFAULT nextval('public.project_prj_id_prj_seq'::regclass);


--
-- Name: role_rol id_rol; Type: DEFAULT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.role_rol ALTER COLUMN id_rol SET DEFAULT nextval('public.role_rol_id_rol_seq'::regclass);


--
-- Name: stage_plot_stp id_stp; Type: DEFAULT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.stage_plot_stp ALTER COLUMN id_stp SET DEFAULT nextval('public.stage_plot_stp_id_stp_seq'::regclass);


--
-- Name: stage_stg id_stg; Type: DEFAULT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.stage_stg ALTER COLUMN id_stg SET DEFAULT nextval('public.stage_stg_id_stg_seq'::regclass);


--
-- Name: state_sta id_sta; Type: DEFAULT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.state_sta ALTER COLUMN id_sta SET DEFAULT nextval('public.state_sta_id_sta_seq'::regclass);


--
-- Name: user_usr id_usr; Type: DEFAULT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.user_usr ALTER COLUMN id_usr SET DEFAULT nextval('public.user_usr_id_usr_seq'::regclass);


--
-- Name: venue_ven id_ven; Type: DEFAULT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.venue_ven ALTER COLUMN id_ven SET DEFAULT nextval('public.venue_ven_id_ven_seq'::regclass);


--
-- Data for Name: element_category_emc; Type: TABLE DATA; Schema: public; Owner: zach
--

COPY public.element_category_emc (id_emc, name_emc, created_at_emc) FROM stdin;
1	Percussion	2026-04-09 12:09:42.057175-04
2	Keys	2026-04-09 12:09:42.057175-04
3	Strings	2026-04-09 12:09:42.057175-04
4	Microphones	2026-04-09 12:09:42.057175-04
5	Monitors	2026-04-09 12:09:42.057175-04
6	Lighting	2026-04-09 12:09:42.057175-04
7	Other	2026-04-09 12:09:42.057175-04
\.


--
-- Data for Name: element_placement_elp; Type: TABLE DATA; Schema: public; Owner: zach
--

COPY public.element_placement_elp (id_elp, id_stp_elp, id_elt_elp, position_x_elp, position_y_elp, position_z_elp, rotation_x_elp, rotation_y_elp, rotation_z_elp, scale_x_elp, scale_y_elp, scale_z_elp, created_at_elp) FROM stdin;
1	1	5	0.00	0.00	0.50	0.00	0.00	0.00	2.00	1.50	0.50	2026-04-09 12:09:42.215373-04
2	1	8	0.00	0.00	5.00	0.00	0.00	0.00	8.00	1.00	1.00	2026-04-09 12:09:42.215777-04
\.


--
-- Data for Name: element_type_elt; Type: TABLE DATA; Schema: public; Owner: zach
--

COPY public.element_type_elt (id_elt, name_elt, description_elt, id_img_elt, default_color_elt, default_scale_x_elt, default_scale_y_elt, default_scale_z_elt, id_emc_elt) FROM stdin;
1	Drum Set	An unelevated drumset	1	#8B4513	1	1	1	1
2	Grand Piano	Grand or upright piano	2	#000000	1	1	1	2
3	Mic Stand	Microphone stand	3	#C0C0C0	1	1	1	4
4	Speaker	Floor monitor speaker	4	#3C3C3C	1.25	1.25	1.25	5
5	Drums On Riser	Drums on an elevated riser	5	#000000	0.02	0.02	0.02	1
6	Music Stand	Music stand	6	#000000	0.03	0.03	0.03	7
7	Electric Guitar	Electric guitar	7	#000000	2	2	2	3
8	Lighting Rig Center Stage	Lighting rig for center stage	8	#000000	1.25	1.25	1.25	6
9	Wedge Monitor	Wedge monitor speaker	9	#000000	0.025	0.025	0.025	5
\.


--
-- Data for Name: image_img; Type: TABLE DATA; Schema: public; Owner: zach
--

COPY public.image_img (id_img, name_img, file_path_img, file_type_img, created_at_img) FROM stdin;
1	Drum Set	https://pub-69909cf75f764e599dc141922a0696eb.r2.dev/drum-set.glb	glb	2026-04-09 12:09:42.056588-04
2	Grand Piano	https://pub-69909cf75f764e599dc141922a0696eb.r2.dev/grand-piano.glb	glb	2026-04-09 12:09:42.056588-04
3	Mic Stand	https://pub-69909cf75f764e599dc141922a0696eb.r2.dev/micstand.glb	glb	2026-04-09 12:09:42.056588-04
4	Speaker	https://pub-69909cf75f764e599dc141922a0696eb.r2.dev/speaker.glb	glb	2026-04-09 12:09:42.056588-04
5	Drums On Riser	https://pub-69909cf75f764e599dc141922a0696eb.r2.dev/1774650260751-drum-on-riser.glb	model/gltf-binary	2026-04-09 12:09:42.056588-04
6	Music Stand	https://pub-69909cf75f764e599dc141922a0696eb.r2.dev/1774649950797-music_stand.glb	model/gltf-binary	2026-04-09 12:09:42.056588-04
7	Electric Guitar	https://pub-69909cf75f764e599dc141922a0696eb.r2.dev/1774650403668-electric_guitar.glb	model/gltf-binary	2026-04-09 12:09:42.056588-04
8	Lighting Rig Center Stage	https://pub-69909cf75f764e599dc141922a0696eb.r2.dev/1774650343674-lighting_rigg_8_meter_center.glb	model/gltf-binary	2026-04-09 12:09:42.056588-04
9	Wedge Monitor	https://pub-69909cf75f764e599dc141922a0696eb.r2.dev/1774654353521-new-active-wedge-monitor-speakers-v1-4.glb	model/gltf-binary	2026-04-09 12:09:42.056588-04
\.


--
-- Data for Name: input_channel_inc; Type: TABLE DATA; Schema: public; Owner: zach
--

COPY public.input_channel_inc (id_inc, id_stp_inc, channel_number_inc, instrument_name_inc, mic_type_inc, notes_inc, created_at_inc) FROM stdin;
1	1	1	Kick Drum	Beta 52A	Gate at -20dB	2026-04-09 12:09:42.216256-04
2	1	2	Snare Top	SM57	\N	2026-04-09 12:09:42.216256-04
3	1	3	Snare Bottom	SM57	\N	2026-04-09 12:09:42.216256-04
4	1	4	Hi-Hat	SM81	\N	2026-04-09 12:09:42.216256-04
5	1	5	Rack Tom 1	Sennheiser MD421	\N	2026-04-09 12:09:42.216256-04
6	1	6	Rack Tom 2	Sennheiser MD421	\N	2026-04-09 12:09:42.216256-04
7	1	7	Floor Tom	Sennheiser MD421	\N	2026-04-09 12:09:42.216256-04
8	1	8	Overhead L	AKG C414	\N	2026-04-09 12:09:42.216256-04
9	1	9	Overhead R	AKG C414	\N	2026-04-09 12:09:42.216256-04
10	1	10	Bass DI	Countryman Type 85	\N	2026-04-09 12:09:42.216256-04
11	1	11	Bass Amp	Sennheiser e906	\N	2026-04-09 12:09:42.216256-04
12	1	12	Guitar 1	SM57	\N	2026-04-09 12:09:42.216256-04
13	1	13	Guitar 2	SM57	\N	2026-04-09 12:09:42.216256-04
14	1	14	Keyboard L	Direct	\N	2026-04-09 12:09:42.216256-04
15	1	15	Keyboard R	Direct	\N	2026-04-09 12:09:42.216256-04
16	1	16	Lead Vocal	Beta 58A	Compression 4:1, reverb	2026-04-09 12:09:42.216256-04
17	1	17	BG Vocal 1	SM58	\N	2026-04-09 12:09:42.216256-04
18	1	18	BG Vocal 2	SM58	\N	2026-04-09 12:09:42.216256-04
\.


--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: zach
--

COPY public.knex_migrations (id, name, batch, migration_time) FROM stdin;
76	20260302163014_add_created_by_and_privacy_to_stages.ts	2	2026-03-02 11:45:39.511-05
77	20260306164631_drop_unique_constraint_inc.ts	3	2026-03-06 11:51:10.083-05
78	20260311002924_on_delete_cascade_users.ts	4	2026-03-10 20:30:21.834-04
79	20260318184130_add_deleted_at_field_stage_table.ts	5	2026-03-18 14:57:04.256-04
80	20260321172851_add_gig_date_to_stageplots.ts	6	2026-03-21 13:32:02.009-04
81	20260328145139_add_default_scale_vals_to_element_type_elt.ts	7	2026-03-28 10:56:04.581-04
82	20260402190039_add_uuid_column_to_stageplots.ts	8	2026-04-02 15:02:25.524-04
84	20260402222629_adding_created_by_to_venue.ts	9	2026-04-02 18:38:44.948-04
85	20260409151604_drop_admin_table.ts	10	2026-04-09 11:28:23.616-04
86	20260409151956_drop_country_table.ts	10	2026-04-09 11:28:23.618-04
87	20260409152736_drop_equipment_type_and_equipment_placement.ts	10	2026-04-09 11:28:23.619-04
88	20260409155603_drop_image_category_and_related_fks.ts	11	2026-04-09 11:57:21.814-04
89	20260409155659_add_element_category_lookup_table.ts	11	2026-04-09 11:57:21.82-04
60	20260126233423_create_user_usr_table.ts	1	2026-02-09 19:29:11.338-05
61	20260126233433_create_state_sta_table.ts	1	2026-02-09 19:29:11.34-05
62	20260126233444_create_admin_adm_table.ts	1	2026-02-09 19:29:11.341-05
63	20260126233503_create_project_prj_table.ts	1	2026-02-09 19:29:11.342-05
64	20260126233633_create_venue_ven_table.ts	1	2026-02-09 19:29:11.343-05
65	20260126235000_create_stage_stg_table.ts	1	2026-02-09 19:29:11.344-05
66	20260126235100_create_image_img_table.ts	1	2026-02-09 19:29:11.345-05
67	20260127000813_create_stage_plot_stp_table.ts	1	2026-02-09 19:29:11.346-05
68	20260127000832_create_equipment_type_eqt_table.ts	1	2026-02-09 19:29:11.346-05
69	20260127000844_create_element_type_elt_table.ts	1	2026-02-09 19:29:11.348-05
70	20260127000902_create_equipment_placement_eqp_table.ts	1	2026-02-09 19:29:11.349-05
71	20260127001009_create_element_placement_elp_table.ts	1	2026-02-09 19:29:11.35-05
72	20260127001025_create_input_channel_inc_table.ts	1	2026-02-09 19:29:11.351-05
73	20260204192917_create_lookup_tables.ts	1	2026-02-09 19:29:11.353-05
74	20260204192947_update_foreign_keys.ts	1	2026-02-09 19:29:11.355-05
75	20260210000049_update_venue_table_remove_varchar_country.ts	1	2026-02-09 19:29:11.355-05
\.


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: zach
--

COPY public.knex_migrations_lock (index, is_locked) FROM stdin;
1	0
\.


--
-- Data for Name: project_prj; Type: TABLE DATA; Schema: public; Owner: zach
--

COPY public.project_prj (id_prj, id_usr_prj, name_prj, description_prj, created_at_prj, updated_at_prj) FROM stdin;
1	1	Summer Rock Concert 2026	Main stage setup for outdoor rock festival at Red Rocks	2026-04-09 12:09:42.210708-04	2026-04-09 12:09:42.210708-04
2	1	Corporate Event Q3	Indoor corporate presentation setup	2026-04-09 12:09:42.211408-04	2026-04-09 12:09:42.211408-04
3	3	Jazz Festival Setup	Small ensemble stage configuration	2026-04-09 12:09:42.211827-04	2026-04-09 12:09:42.211827-04
4	2	Arena Tour - Vancouver Stop	Full arena production setup	2026-04-09 12:09:42.212524-04	2026-04-09 12:09:42.212524-04
\.


--
-- Data for Name: role_rol; Type: TABLE DATA; Schema: public; Owner: zach
--

COPY public.role_rol (id_rol, name_rol, description_rol, created_at_rol) FROM stdin;
1	regular	Standard user permissions	2026-04-09 12:09:42.054586-04
2	admin	Administrative privileges	2026-04-09 12:09:42.054586-04
3	superuser	Full system access	2026-04-09 12:09:42.054586-04
\.


--
-- Data for Name: stage_plot_stp; Type: TABLE DATA; Schema: public; Owner: zach
--

COPY public.stage_plot_stp (id_stp, id_prj_stp, id_stg_stp, name_stp, created_at_stp, gig_date_stp, uuid_stp) FROM stdin;
1	1	6	Main Stage Layout - Rock Show	2026-04-09 12:09:42.213123-04	\N	06ca430e-47e4-4e44-9e84-04fb5535bbd0
2	2	11	Corporate Presentation Setup	2026-04-09 12:09:42.213938-04	\N	01f7a56c-1f31-4356-a192-dd4cdf9b9c43
3	3	11	Jazz Quartet Configuration	2026-04-09 12:09:42.214424-04	\N	5bb9504f-e745-4707-ab5c-ea354496546a
8	1	7	create stage plot from StageRead for MSG	2026-04-16 13:09:36.166683-04	\N	4cc23a4d-7f87-411c-a00e-c993e9625c50
9	1	7	MSG test for creeat plot from stageread	2026-04-16 13:19:59.876772-04	2026-04-22	dc296b85-d967-44d9-83ca-6f7eab57a995
10	2	8	testing context set	2026-04-16 13:35:40.672455-04	2026-04-21	c6a27044-a575-4764-8fa1-831eb68ca2e1
\.


--
-- Data for Name: stage_stg; Type: TABLE DATA; Schema: public; Owner: zach
--

COPY public.stage_stg (id_stg, id_ven_stg, name_stg, width_stg, depth_stg, height_stg, created_at_stg, created_by_stg, is_public_stg, deleted_at_stg) FROM stdin;
1	\N	Proscenium	25.00	25.00	10.00	2026-04-09 12:09:42.058488-04	\N	f	\N
2	\N	Thrust	35.00	25.00	10.00	2026-04-09 12:09:42.058488-04	\N	f	\N
3	\N	Arena	45.00	30.00	20.00	2026-04-09 12:09:42.058488-04	\N	f	\N
4	\N	Black Box	35.00	30.00	10.00	2026-04-09 12:09:42.058488-04	\N	f	\N
5	\N	Outdoor Festival	25.00	40.00	10.00	2026-04-09 12:09:42.058488-04	\N	f	\N
6	1	Red Rocks Main Stage	60.00	40.00	3.00	2026-04-09 12:09:42.208591-04	1	t	\N
7	2	MSG Center Stage	50.00	35.00	2.50	2026-04-09 12:09:42.209028-04	2	t	\N
8	3	Riverbend Main Stage	55.00	35.00	2.50	2026-04-09 12:09:42.209328-04	1	t	\N
9	4	Ryman Main Stage	30.00	20.00	1.50	2026-04-09 12:09:42.209602-04	1	t	\N
10	5	Fillmore Main Stage	25.00	18.00	1.20	2026-04-09 12:09:42.20986-04	1	t	\N
11	\N	Standard 40x30 Stage	40.00	30.00	2.00	2026-04-09 12:09:42.210134-04	1	t	\N
12	\N	Standard 20x20 Stage	20.00	20.00	3.00	2026-04-09 12:09:42.210416-04	1	f	\N
18	6	asdfasdf	2.00	20.00	20.00	2026-04-18 14:55:59.882513-04	1	t	2026-04-18 14:58:29.357207-04
15	6	asdasdf	20.00	20.00	20.00	2026-04-18 14:50:02.10346-04	1	f	2026-04-18 14:58:43.835602-04
14	6	random stage	10.00	10.00	20.00	2026-04-18 14:49:39.322904-04	1	f	2026-04-18 15:06:51.08617-04
16	8	new stage	30.00	30.00	30.00	2026-04-18 14:50:25.016414-04	1	f	2026-04-18 15:06:59.654926-04
13	6	New stage	10.00	10.00	2.00	2026-04-16 10:58:27.806543-04	1	f	2026-04-18 15:07:37.314936-04
17	6	testing crud stage	30.00	30.00	30.00	2026-04-18 14:52:51.176637-04	1	f	2026-04-18 15:07:40.615814-04
19	6	testing new stage soft delete	20.00	20.00	20.00	2026-04-18 15:09:03.25677-04	1	t	2026-04-18 15:09:15.304533-04
20	6	testing private functionality	30.00	30.00	30.00	2026-04-18 15:09:32.563541-04	1	f	\N
21	10	testing state name	20.00	20.00	20.00	2026-04-18 15:11:50.357184-04	1	t	\N
\.


--
-- Data for Name: state_sta; Type: TABLE DATA; Schema: public; Owner: zach
--

COPY public.state_sta (id_sta, name_sta, abbreviation_sta) FROM stdin;
1	Alabama	AL
2	Alaska	AK
3	Arizona	AZ
4	Arkansas	AR
5	California	CA
6	Colorado	CO
7	Connecticut	CT
8	Delaware	DE
9	Florida	FL
10	Georgia	GA
11	Hawaii	HI
12	Idaho	ID
13	Illinois	IL
14	Indiana	IN
15	Iowa	IA
16	Kansas	KS
17	Kentucky	KY
18	Louisiana	LA
19	Maine	ME
20	Maryland	MD
21	Massachusetts	MA
22	Michigan	MI
23	Minnesota	MN
24	Mississippi	MS
25	Missouri	MO
26	Montana	MT
27	Nebraska	NE
28	Nevada	NV
29	New Hampshire	NH
30	New Jersey	NJ
31	New Mexico	NM
32	New York	NY
33	North Carolina	NC
34	North Dakota	ND
35	Ohio	OH
36	Oklahoma	OK
37	Oregon	OR
38	Pennsylvania	PA
39	Rhode Island	RI
40	South Carolina	SC
41	South Dakota	SD
42	Tennessee	TN
43	Texas	TX
44	Utah	UT
45	Vermont	VT
46	Virginia	VA
47	Washington	WA
48	West Virginia	WV
49	Wisconsin	WI
50	Wyoming	WY
\.


--
-- Data for Name: user_usr; Type: TABLE DATA; Schema: public; Owner: zach
--

COPY public.user_usr (id_usr, email_usr, password_hash_usr, first_name_usr, last_name_usr, is_active_usr, created_at_usr, id_rol_usr) FROM stdin;
1	demo@stagethree.com	$2b$10$VQRUlG/q6v5JcsT8XDUS9OUsdpZ9VgcLHTq7AHYTSmBHishBFpXai	Demo	User	t	2026-04-09 12:09:42.096671-04	1
2	admin@stagethree.com	$2b$10$klUSnFgCSfcAo8AG3xv/yO4tXLpn9AVMy9DyjXXQr1C8RWHjh0zTW	Admin	User	t	2026-04-09 12:09:42.134081-04	2
3	user@stagethree.com	$2b$10$bCVwkntGlwhJdRmEN9ljgO5lMFOVhHD5f4nB.CgUf4DIZ/Ai7bmUe	Regular	User	t	2026-04-09 12:09:42.170348-04	1
4	superuser@stagethree.com	$2b$10$T0l4u6JrbSwKbqLmzllY1.V8jfXauedB6PIG6GxD.0PpJJ6w.QtpS	Super	User	t	2026-04-09 12:09:42.206632-04	3
\.


--
-- Data for Name: venue_ven; Type: TABLE DATA; Schema: public; Owner: zach
--

COPY public.venue_ven (id_ven, name_ven, address_ven, city_ven, id_sta_ven, capacity_ven, created_at_ven, created_by_ven) FROM stdin;
1	Red Rocks Amphitheatre	18300 W Alameda Pkwy	Morrison	\N	9525	2026-04-09 12:09:42.207047-04	\N
2	Madison Square Garden	4 Pennsylvania Plaza	New York	\N	20789	2026-04-09 12:09:42.207472-04	\N
3	Riverbend Music Center	6295 Kellogg Ave	Cincinnati	\N	20500	2026-04-09 12:09:42.207747-04	\N
4	Ryman Auditorium	116 5th Ave N	Nashville	\N	2362	2026-04-09 12:09:42.208011-04	\N
5	The Fillmore	1805 Geary Blvd	San Francisco	\N	1150	2026-04-09 12:09:42.208268-04	\N
6	A venue in Maine	123 Main Street	Portland	19	100	2026-04-10 10:36:43.767486-04	1
7	A venue in Vermont	135 Tree Avenue	Burlington	45	200	2026-04-10 10:37:26.780445-04	1
8	asdf	asdf	asdf	18	20	2026-04-10 10:38:00.597169-04	1
9	asdf	asdf	asdf	19	220	2026-04-10 10:44:20.970208-04	1
10	Some Kentucky Venu	Some address in kentucky	Louisville	17	20	2026-04-18 15:11:38.1674-04	1
\.


--
-- Name: element_category_emc_id_emc_seq; Type: SEQUENCE SET; Schema: public; Owner: zach
--

SELECT pg_catalog.setval('public.element_category_emc_id_emc_seq', 7, true);


--
-- Name: element_placement_elp_id_elp_seq; Type: SEQUENCE SET; Schema: public; Owner: zach
--

SELECT pg_catalog.setval('public.element_placement_elp_id_elp_seq', 2, true);


--
-- Name: element_type_elt_id_elt_seq; Type: SEQUENCE SET; Schema: public; Owner: zach
--

SELECT pg_catalog.setval('public.element_type_elt_id_elt_seq', 9, true);


--
-- Name: image_img_id_img_seq; Type: SEQUENCE SET; Schema: public; Owner: zach
--

SELECT pg_catalog.setval('public.image_img_id_img_seq', 9, true);


--
-- Name: input_channel_inc_id_inc_seq; Type: SEQUENCE SET; Schema: public; Owner: zach
--

SELECT pg_catalog.setval('public.input_channel_inc_id_inc_seq', 18, true);


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zach
--

SELECT pg_catalog.setval('public.knex_migrations_id_seq', 89, true);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: zach
--

SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);


--
-- Name: project_prj_id_prj_seq; Type: SEQUENCE SET; Schema: public; Owner: zach
--

SELECT pg_catalog.setval('public.project_prj_id_prj_seq', 4, true);


--
-- Name: role_rol_id_rol_seq; Type: SEQUENCE SET; Schema: public; Owner: zach
--

SELECT pg_catalog.setval('public.role_rol_id_rol_seq', 3, true);


--
-- Name: stage_plot_stp_id_stp_seq; Type: SEQUENCE SET; Schema: public; Owner: zach
--

SELECT pg_catalog.setval('public.stage_plot_stp_id_stp_seq', 10, true);


--
-- Name: stage_stg_id_stg_seq; Type: SEQUENCE SET; Schema: public; Owner: zach
--

SELECT pg_catalog.setval('public.stage_stg_id_stg_seq', 23, true);


--
-- Name: state_sta_id_sta_seq; Type: SEQUENCE SET; Schema: public; Owner: zach
--

SELECT pg_catalog.setval('public.state_sta_id_sta_seq', 50, true);


--
-- Name: user_usr_id_usr_seq; Type: SEQUENCE SET; Schema: public; Owner: zach
--

SELECT pg_catalog.setval('public.user_usr_id_usr_seq', 4, true);


--
-- Name: venue_ven_id_ven_seq; Type: SEQUENCE SET; Schema: public; Owner: zach
--

SELECT pg_catalog.setval('public.venue_ven_id_ven_seq', 10, true);


--
-- Name: element_category_emc element_category_emc_name_emc_unique; Type: CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.element_category_emc
    ADD CONSTRAINT element_category_emc_name_emc_unique UNIQUE (name_emc);


--
-- Name: element_category_emc element_category_emc_pkey; Type: CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.element_category_emc
    ADD CONSTRAINT element_category_emc_pkey PRIMARY KEY (id_emc);


--
-- Name: element_placement_elp element_placement_elp_pkey; Type: CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.element_placement_elp
    ADD CONSTRAINT element_placement_elp_pkey PRIMARY KEY (id_elp);


--
-- Name: element_type_elt element_type_elt_name_elt_unique; Type: CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.element_type_elt
    ADD CONSTRAINT element_type_elt_name_elt_unique UNIQUE (name_elt);


--
-- Name: element_type_elt element_type_elt_pkey; Type: CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.element_type_elt
    ADD CONSTRAINT element_type_elt_pkey PRIMARY KEY (id_elt);


--
-- Name: image_img image_img_pkey; Type: CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.image_img
    ADD CONSTRAINT image_img_pkey PRIMARY KEY (id_img);


--
-- Name: input_channel_inc input_channel_inc_pkey; Type: CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.input_channel_inc
    ADD CONSTRAINT input_channel_inc_pkey PRIMARY KEY (id_inc);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: project_prj project_prj_pkey; Type: CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.project_prj
    ADD CONSTRAINT project_prj_pkey PRIMARY KEY (id_prj);


--
-- Name: role_rol role_rol_name_rol_unique; Type: CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.role_rol
    ADD CONSTRAINT role_rol_name_rol_unique UNIQUE (name_rol);


--
-- Name: role_rol role_rol_pkey; Type: CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.role_rol
    ADD CONSTRAINT role_rol_pkey PRIMARY KEY (id_rol);


--
-- Name: stage_plot_stp stage_plot_stp_pkey; Type: CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.stage_plot_stp
    ADD CONSTRAINT stage_plot_stp_pkey PRIMARY KEY (id_stp);


--
-- Name: stage_plot_stp stage_plot_stp_uuid_stp_unique; Type: CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.stage_plot_stp
    ADD CONSTRAINT stage_plot_stp_uuid_stp_unique UNIQUE (uuid_stp);


--
-- Name: stage_stg stage_stg_pkey; Type: CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.stage_stg
    ADD CONSTRAINT stage_stg_pkey PRIMARY KEY (id_stg);


--
-- Name: state_sta state_sta_abbreviation_sta_unique; Type: CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.state_sta
    ADD CONSTRAINT state_sta_abbreviation_sta_unique UNIQUE (abbreviation_sta);


--
-- Name: state_sta state_sta_name_sta_unique; Type: CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.state_sta
    ADD CONSTRAINT state_sta_name_sta_unique UNIQUE (name_sta);


--
-- Name: state_sta state_sta_pkey; Type: CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.state_sta
    ADD CONSTRAINT state_sta_pkey PRIMARY KEY (id_sta);


--
-- Name: user_usr user_usr_email_usr_unique; Type: CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.user_usr
    ADD CONSTRAINT user_usr_email_usr_unique UNIQUE (email_usr);


--
-- Name: user_usr user_usr_pkey; Type: CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.user_usr
    ADD CONSTRAINT user_usr_pkey PRIMARY KEY (id_usr);


--
-- Name: venue_ven venue_ven_pkey; Type: CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.venue_ven
    ADD CONSTRAINT venue_ven_pkey PRIMARY KEY (id_ven);


--
-- Name: element_placement_elp element_placement_elp_id_elt_elp_foreign; Type: FK CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.element_placement_elp
    ADD CONSTRAINT element_placement_elp_id_elt_elp_foreign FOREIGN KEY (id_elt_elp) REFERENCES public.element_type_elt(id_elt) ON DELETE CASCADE;


--
-- Name: element_placement_elp element_placement_elp_id_stp_elp_foreign; Type: FK CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.element_placement_elp
    ADD CONSTRAINT element_placement_elp_id_stp_elp_foreign FOREIGN KEY (id_stp_elp) REFERENCES public.stage_plot_stp(id_stp) ON DELETE CASCADE;


--
-- Name: element_type_elt element_type_elt_id_emc_elt_foreign; Type: FK CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.element_type_elt
    ADD CONSTRAINT element_type_elt_id_emc_elt_foreign FOREIGN KEY (id_emc_elt) REFERENCES public.element_category_emc(id_emc) ON DELETE SET NULL;


--
-- Name: element_type_elt element_type_elt_id_img_elt_foreign; Type: FK CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.element_type_elt
    ADD CONSTRAINT element_type_elt_id_img_elt_foreign FOREIGN KEY (id_img_elt) REFERENCES public.image_img(id_img) ON DELETE SET NULL;


--
-- Name: input_channel_inc input_channel_inc_id_stp_inc_foreign; Type: FK CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.input_channel_inc
    ADD CONSTRAINT input_channel_inc_id_stp_inc_foreign FOREIGN KEY (id_stp_inc) REFERENCES public.stage_plot_stp(id_stp) ON DELETE CASCADE;


--
-- Name: project_prj project_prj_id_usr_prj_foreign; Type: FK CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.project_prj
    ADD CONSTRAINT project_prj_id_usr_prj_foreign FOREIGN KEY (id_usr_prj) REFERENCES public.user_usr(id_usr) ON DELETE CASCADE;


--
-- Name: stage_plot_stp stage_plot_stp_id_prj_stp_foreign; Type: FK CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.stage_plot_stp
    ADD CONSTRAINT stage_plot_stp_id_prj_stp_foreign FOREIGN KEY (id_prj_stp) REFERENCES public.project_prj(id_prj) ON DELETE CASCADE;


--
-- Name: stage_plot_stp stage_plot_stp_id_stg_stp_foreign; Type: FK CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.stage_plot_stp
    ADD CONSTRAINT stage_plot_stp_id_stg_stp_foreign FOREIGN KEY (id_stg_stp) REFERENCES public.stage_stg(id_stg) ON DELETE SET NULL;


--
-- Name: stage_stg stage_stg_created_by_stg_foreign; Type: FK CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.stage_stg
    ADD CONSTRAINT stage_stg_created_by_stg_foreign FOREIGN KEY (created_by_stg) REFERENCES public.user_usr(id_usr) ON DELETE CASCADE;


--
-- Name: stage_stg stage_stg_id_ven_stg_foreign; Type: FK CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.stage_stg
    ADD CONSTRAINT stage_stg_id_ven_stg_foreign FOREIGN KEY (id_ven_stg) REFERENCES public.venue_ven(id_ven) ON DELETE SET NULL;


--
-- Name: user_usr user_usr_id_rol_usr_foreign; Type: FK CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.user_usr
    ADD CONSTRAINT user_usr_id_rol_usr_foreign FOREIGN KEY (id_rol_usr) REFERENCES public.role_rol(id_rol);


--
-- Name: venue_ven venue_ven_created_by_ven_foreign; Type: FK CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.venue_ven
    ADD CONSTRAINT venue_ven_created_by_ven_foreign FOREIGN KEY (created_by_ven) REFERENCES public.user_usr(id_usr) ON DELETE SET NULL;


--
-- Name: venue_ven venue_ven_id_sta_ven_foreign; Type: FK CONSTRAINT; Schema: public; Owner: zach
--

ALTER TABLE ONLY public.venue_ven
    ADD CONSTRAINT venue_ven_id_sta_ven_foreign FOREIGN KEY (id_sta_ven) REFERENCES public.state_sta(id_sta) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict tzmzC522tDlbLLgWAJt2dExcohdb7QfAM3AtoNEgN959bKqpnBvqZhzZ3VubCSv

