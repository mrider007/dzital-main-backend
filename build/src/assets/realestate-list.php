<?php include 'header.php'; ?>

<!-- page header part start here -->
<section class="pageBanner">
    <article class="container">
        <aside class="row">
            <div class="col-md-6">
                <h4>Realestate List Page</h4>
            </div>
            <div class="col-md-6">
                <ul class="navList">
                    <li><a href="index.php">Home</a></li>
                    <li><a href="javascript:void(0)">Category</a></li>
                    <li class="active">Realestate List Page</li>
                </ul>
            </div>
        </aside>
    </article>
</section>
<!-- page header part end here -->

<!-- page body part start -->
<section class="midBody">
    <article class="container-fluid">
        <article class="row">
            <!-- ad box start -->
            <div class="col-md-1 adBx sticky-top">
                <div class="sticky-top">
                    <img src="assets/images/Ad.jpg" alt="" />
                </div>
            </div>
            <!-- ad box end -->

            <!-- left part start -->
            <div class="col-md-2">
                <nav class="navbar navbar-expand-lg bg-body-tertiary sideBarNav">
                    <div class="titelBx">
                        <a class="navbar-brand" href="#sideBarCollapse" data-bs-toggle="collapse" aria-controls="sideBarCollapse">Short By Filter</a>
                        <i class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sideBarCollapse" aria-controls="sideBarCollapse">
                            <span class="fa fa-chevron-down"></span>
                        </i>
                    </div>
                    <div class="collapse navbar-collapse" id="sideBarCollapse">
                        <div class="customeSidebar">

                            <div class="dropHeadBx"><a class="collapseLink" data-bs-toggle="collapse" href="#wohnungMieten">To Rent An Apartment <i class="fa fa-chevron-circle-down pull-right mt3"></i></a></div>
                            <div class="collapse show" id="wohnungMieten">

                                <div class="headBx">Rent</div>
                                <div class="listBx">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="mietenRadio" id="mietenRadio1" checked>
                                        <label class="form-check-label" for="mietenRadio1">Apartment</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="mietenRadio" id="mietenRadio2">
                                        <label class="form-check-label" for="mietenRadio2">House</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="mietenRadio" id="mietenRadio3">
                                        <label class="form-check-label" for="mietenRadio3">temporary living</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="mietenRadio" id="mietenRadio4">
                                        <label class="form-check-label" for="mietenRadio4">Shared apartment</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="mietenRadio" id="mietenRadio5">
                                        <label class="form-check-label" for="mietenRadio5">Commercial real estate</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="mietenRadio" id="mietenRadio6">
                                        <label class="form-check-label" for="mietenRadio6">Garage/parking space</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="mietenRadio" id="mietenRadio7">
                                        <label class="form-check-label" for="mietenRadio7">Property tax</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="mietenRadio" id="mietenRadio8">
                                        <label class="form-check-label" for="mietenRadio8">New construction project</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="mietenRadio" id="mietenRadio9">
                                        <label class="form-check-label" for="mietenRadio9">Miscellaneous</label>
                                    </div>
                                </div>
                                <div class="headBx">Buy</div>
                                <div class="listBx">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="kaufenRadio" id="kaufenRadio1" checked>
                                        <label class="form-check-label" for="kaufenRadio1">House</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="kaufenRadio" id="kaufenRadio2">
                                        <label class="form-check-label" for="kaufenRadio2">Apartment</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="kaufenRadio" id="kaufenRadio3">
                                        <label class="form-check-label" for="kaufenRadio3">New Building Project</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="kaufenRadio" id="kaufenRadio4">
                                        <label class="form-check-label" for="kaufenRadio4">Commercial Real Estate</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="kaufenRadio" id="kaufenRadio5">
                                        <label class="form-check-label" for="kaufenRadio5">Property</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="kaufenRadio" id="kaufenRadio6">
                                        <label class="form-check-label" for="kaufenRadio6">Investment Property</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="kaufenRadio" id="kaufenRadio7">
                                        <label class="form-check-label" for="kaufenRadio7">Garage</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="kaufenRadio" id="kaufenRadio8">
                                        <label class="form-check-label" for="kaufenRadio8">Other</label>
                                    </div>
                                </div>
                                <div class="headBx">Build</div>
                                <div class="listBx">
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> House Construction & Catalogs
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Prefabricated Houses
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Solid Houses
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Model Houses
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Model Home Parks
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Construction Financing
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="headBx">TYPE</div>
                            <div class="listBx">
                                <select name="objectType" class="form-control" title="Property Type">
                                    <option value="">Any</option>
                                    <option value="etage">Apartment</option>
                                    <option value="mehrfamilienhaus">Apartment building</option>
                                    <option value="dachgeschoss">Attic</option>
                                    <option value="geschaeftshaus">Commercial Building</option>
                                    <option value="gewerbeeinheit">Commercial Unit</option>
                                    <option value="maisonette">Maisonnette</option>
                                    <option value="penthouse">Penthouse</option>
                                    <option value="wohnanlage">Residential Complex</option>
                                </select>
                            </div>
                            <div class="headBx">Status</div>
                            <div class="listBx">
                                <select name="status" class="form-control" title="Status">
                                    <option value="">Any</option>
                                    <option value="s0">Vacant</option>
                                    <option value="s1">Tenanted</option>
                                </select>
                            </div>
                            <div class="headBx">Location</div>
                            <div class="listBx">
                                <select name="status" class="form-control" title="Status">
                                    <option>Any</option>
                                    <option>Charlottenburg</option>
                                    <option>Dahlem</option>
                                    <option>Friedenau</option>
                                    <option>Friedrichshain</option>
                                    <option>Karlshorst</option>
                                    <option>Kreuzberg</option>
                                </select>
                            </div>
                            <div class="headBx">Bedrooms</div>
                            <div class="listBx">
                                <select name="status" class="form-control" title="Status">
                                    <option>Any</option>
                                    <option>Studio</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                            <div class="headBx">Price Range</div>
                            <div class="listBx">
                                <label for="">Min Price</label>
                                <select name="price_from" class="form-control form-control-sm" title="Any">
                                    <option value="">Any</option>
                                    <option value="100000">100,000</option>
                                    <option value="200000">200,000</option>
                                    <option value="300000">300,000</option>
                                    <option value="400000">400,000</option>
                                    <option value="500000">500,000</option>
                                    <option value="600000">600,000</option>
                                    <option value="700000">700,000</option>
                                    <option value="800000">800,000</option>
                                    <option value="1000000">1,000,000+</option>
                                </select>
                                <label class="mt10" for="">Max Price</label>
                                <select name="price_to" class="form-control form-control-sm" id="search-type" title="Any">
                                    <option value="">Any</option>
                                    <option value="100000">100,000</option>
                                    <option value="200000">200,000</option>
                                    <option value="300000">300,000</option>
                                    <option value="400000">400,000</option>
                                    <option value="500000">500,000</option>
                                    <option value="600000">600,000</option>
                                    <option value="700000">700,000</option>
                                    <option value="800000">800,000</option>
                                    <option value="1000000">1,000,000+</option>
                                </select>
                                <div class="mt10 mb10">
                                    <input type="submit" class="btn btnTheme btn-sm" value="Search">
                                    <input type="reset" class="btn btnTheme btn-sm" value="Reset">
                                </div>
                            </div>
                            <div class="headBx">Similar category</div>
                            <div class="listBx p0">
                                <div class="list-group round0">
                                    <a class="list-group-item d-flex justify-content-between align-items-center">
                                        Freelancer
                                        <span class="badge bg-primary rounded-pill">92</span>
                                    </a>
                                    <a class="list-group-item d-flex justify-content-between align-items-center">
                                        Jobs
                                        <span class="badge bg-primary rounded-pill">56</span>
                                    </a>
                                    <a class="list-group-item d-flex justify-content-between align-items-center">
                                        Realestate
                                        <span class="badge bg-primary rounded-pill">42</span>
                                    </a>
                                    <a class="list-group-item d-flex justify-content-between align-items-center">
                                        Lessons & Courses
                                        <span class="badge bg-primary rounded-pill">30</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <!-- left part end -->

            <!-- right part start -->
            <div class="col-md-8">
                <!-- product item start -->
                <div class="card mb-3 realestateItem">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <a href="realestate-details.php">
                                <img src="assets/images/realestate-1.jpeg" class="img-fluid rounded-start" alt="...">
                            </a>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title"><a href="realestate-details.php">Luxury Penthouse in Samariterkiez with Amazing 63m² Private Roof Terrace</a></h5>
                                <div class="row">
                                    <div class="col-md-8">
                                        <h3 class="theme-text"><b>€1,095,000</b></h3>
                                    </div>
                                    <div class="col-md-4" align="right">
                                        <a class="text-success" href="#."><i class="fa fa-share-alt text20"></i></a>&nbsp;&nbsp;
                                        <a class="text-danger" href="#."><i class="fa fa-heart-o text20"></i></a>
                                    </div>
                                </div>
                                <p class="card-text theme-muted mb5"><b>1 Bedroom Penthouse in Friedrichshain</b></p>
                                <p class="card-text">The property is located in Friedrichshain close to Prenzlauer Berg. This area has fantastic transport with trams, trains and bus routes close by. The S41 & S42 Ring Bahn routes are just a short walk away at Storkower Straße...</p>
                                <a class="btn btnTheme" href="realestate-details.php">View Property >></a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- product item end -->

                <!-- product item start -->
                <div class="card mb-3 realestateItem">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <a href="realestate-details.php">
                                <img src="assets/images/realestate-2.jpg" class="img-fluid rounded-start" alt="...">
                            </a>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title"><a href="realestate-details.php">3 ROOM NEWLY CONSTRUCTED APARTMENT WITH 2 BALCONIES READY TO MOVE INTO</a></h5>
                                <div class="row">
                                    <div class="col-md-8">
                                        <h3 class="theme-text"><b>€ 475,000</b></h3>
                                    </div>
                                    <div class="col-md-4" align="right">
                                        <a class="text-success" href="#."><i class="fa fa-share-alt text20"></i></a>&nbsp;&nbsp;
                                        <a class="text-danger" href="#."><i class="fa fa-heart-o text20"></i></a>
                                    </div>
                                </div>
                                <p class="card-text theme-muted mb5"><b>2 BEDROOM APARTMENT IN WEDDING</b></p>
                                <p class="card-text">Newly constructed building consisting of 76 total residential units, with a mix of comfortable studios, one-bedroom and two-bedroom apartments. All apartments have balconies, while there are garden terraces on the first floor and roof terraces on the top floor. The multi-divided inner courtyard is divided into green...</p>
                                <a class="btn btnTheme" href="realestate-details.php">View Property >></a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- product item end -->
                <!-- product item start -->
                <div class="card mb-3 realestateItem">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <a href="realestate-details.php">
                                <img src="assets/images/realestate-3.jpg" class="img-fluid rounded-start" alt="...">
                            </a>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title"><a href="realestate-details.php">Luxury Penthouse in Samariterkiez with Amazing 63m² Private Roof Terrace</a></h5>
                                <div class="row">
                                    <div class="col-md-8">
                                        <h3 class="theme-text"><b>€1,095,000</b></h3>
                                    </div>
                                    <div class="col-md-4" align="right">
                                        <a class="text-success" href="#."><i class="fa fa-share-alt text20"></i></a>&nbsp;&nbsp;
                                        <a class="text-danger" href="#."><i class="fa fa-heart-o text20"></i></a>
                                    </div>
                                </div>
                                <p class="card-text theme-muted mb5"><b>1 Bedroom Penthouse in Friedrichshain</b></p>
                                <p class="card-text">The property is located in Friedrichshain close to Prenzlauer Berg. This area has fantastic transport with trams, trains and bus routes close by. The S41 & S42 Ring Bahn routes are just a short walk away at Storkower Straße...</p>
                                <a class="btn btnTheme" href="realestate-details.php">View Property >></a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- product item end -->

                <!-- product item start -->
                <div class="card mb-3 realestateItem">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <a href="realestate-details.php">
                                <img src="assets/images/realestate-4.jpg" class="img-fluid rounded-start" alt="...">
                            </a>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title"><a href="realestate-details.php">3 ROOM NEWLY CONSTRUCTED APARTMENT WITH 2 BALCONIES READY TO MOVE INTO</a></h5>
                                <div class="row">
                                    <div class="col-md-8">
                                        <h3 class="theme-text"><b>€ 475,000</b></h3>
                                    </div>
                                    <div class="col-md-4" align="right">
                                        <a class="text-success" href="#."><i class="fa fa-share-alt text20"></i></a>&nbsp;&nbsp;
                                        <a class="text-danger" href="#."><i class="fa fa-heart-o text20"></i></a>
                                    </div>
                                </div>
                                <p class="card-text theme-muted mb5"><b>2 BEDROOM APARTMENT IN WEDDING</b></p>
                                <p class="card-text">Newly constructed building consisting of 76 total residential units, with a mix of comfortable studios, one-bedroom and two-bedroom apartments. All apartments have balconies, while there are garden terraces on the first floor and roof terraces on the top floor. The multi-divided inner courtyard is divided into green...</p>
                                <a class="btn btnTheme" href="realestate-details.php">View Property >></a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- product item end -->
                <!-- product item start -->
                <div class="card mb-3 realestateItem">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <a href="realestate-details.php">
                                <img src="assets/images/realestate-5.jpg" class="img-fluid rounded-start" alt="...">
                            </a>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title"><a href="realestate-details.php">Luxury Penthouse in Samariterkiez with Amazing 63m² Private Roof Terrace</a></h5>
                                <div class="row">
                                    <div class="col-md-8">
                                        <h3 class="theme-text"><b>€1,095,000</b></h3>
                                    </div>
                                    <div class="col-md-4" align="right">
                                        <a class="text-success" href="#."><i class="fa fa-share-alt text20"></i></a>&nbsp;&nbsp;
                                        <a class="text-danger" href="#."><i class="fa fa-heart-o text20"></i></a>
                                    </div>
                                </div>
                                <p class="card-text theme-muted mb5"><b>1 Bedroom Penthouse in Friedrichshain</b></p>
                                <p class="card-text">The property is located in Friedrichshain close to Prenzlauer Berg. This area has fantastic transport with trams, trains and bus routes close by. The S41 & S42 Ring Bahn routes are just a short walk away at Storkower Straße...</p>
                                <a class="btn btnTheme" href="realestate-details.php">View Property >></a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- product item end -->

                <!-- pagenation start -->
                <div align="center">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination d-inline-flex">
                            <li class="page-item"><a class="page-link" href="#.">Previous</a></li>
                            <li class="page-item active"><a class="page-link" href="#.">1</a></li>
                            <li class="page-item"><a class="page-link" href="#.">2</a></li>
                            <li class="page-item"><a class="page-link" href="#.">3</a></li>
                            <li class="page-item"><a class="page-link" href="#.">Next</a></li>
                        </ul>
                    </nav>
                </div>
                <!-- pagenation end -->
            </div>
            <!-- right part end -->

            <!-- ad box start -->
            <div class="col-md-1 adBx">
                <div class="sticky-top">
                    <img src="assets/images/Ad.jpg" alt="" />
                </div>
            </div>
            <!-- ad box end -->
        </article>
    </article>
</section>
<!-- page body part end -->

<?php include 'footer.php'; ?>