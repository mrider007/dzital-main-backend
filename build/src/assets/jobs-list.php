<?php include 'header.php'; ?>

<!-- page header part start here -->
<section class="pageBanner">
    <article class="container">
        <aside class="row">
            <div class="col-md-6">
                <h4>Jobs</h4>
            </div>
            <div class="col-md-6">
                <ul class="navList">
                    <li><a href="index.php">Home</a></li>
                    <li><a href="javascript:void(0)">Category</a></li>
                    <li class="active">Jobs</li>
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
            <div class="col-md-1 adBx">
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
                            <div class="headBx">Work mode</div>
                            <div class="listBx p0">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <label><input type="checkbox"> Work from office</label>
                                        <span class="badge bg-primary rounded-pill">49</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <label><input type="checkbox"> Remote</label>
                                        <span class="badge bg-primary rounded-pill">5</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <label><input type="checkbox"> Hybrid</label>
                                        <span class="badge bg-primary rounded-pill">7</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="headBx">Experience</div>
                            <div class="listBx">
                                <input type="range" value="200" min="0" max="1000" class="width100 mt10 mb10" />
                            </div>
                            <div class="headBx">Department</div>
                            <div class="listBx p0">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <label><input type="checkbox"> Engineering - Sof..</label>
                                        <span class="badge bg-primary rounded-pill">32</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <label><input type="checkbox"> UX, Design & Arc..</label>
                                        <span class="badge bg-primary rounded-pill">20</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <label><input type="checkbox"> Sales & Busines..</label>
                                        <span class="badge bg-primary rounded-pill">7</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <label><input type="checkbox"> Marketing & Com..</label>
                                        <span class="badge bg-primary rounded-pill">5</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="headBx">Salary</div>
                            <div class="listBx p0">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> 3-6 Lakhs (605)
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> 6-10 Lakhs (664)
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> 10-15 Lakhs (209)
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> 15-25 Lakhs (30)
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> 50-75 Lakhs (2)
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> 0-3 Lakhs (142)
                                        </label>
                                    </li>
                                </ul>
                            </div>
                            <div class="headBx">Company type</div>
                            <div class="listBx p0">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <label><input type="checkbox"> Corporate</label>
                                        <span class="badge bg-primary rounded-pill">20</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <label><input type="checkbox"> Foreign MNC</label>
                                        <span class="badge bg-primary rounded-pill">16</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <label><input type="checkbox"> Indian MNC</label>
                                        <span class="badge bg-primary rounded-pill">5</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <label><input type="checkbox"> Startup</label>
                                        <span class="badge bg-primary rounded-pill">25</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="headBx">Education</div>
                            <div class="listBx p0">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <label><input type="checkbox"> Any Postgraduate</label>
                                        <span class="badge bg-primary rounded-pill">15</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <label><input type="checkbox"> Post Graduation N..</label>
                                        <span class="badge bg-primary rounded-pill">7</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <label><input type="checkbox"> Any Graduate</label>
                                        <span class="badge bg-primary rounded-pill">2</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <label><input type="checkbox"> B.Tech/B.E.</label>
                                        <span class="badge bg-primary rounded-pill">12</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="headBx">Industry</div>
                            <div class="listBx p0">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <label><input type="checkbox"> IT Services & Con..</label>
                                        <span class="badge bg-primary rounded-pill">7</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <label><input type="checkbox"> Animation & VFX</label>
                                        <span class="badge bg-primary rounded-pill">16</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <label><input type="checkbox"> Advertising & Ma..</label>
                                        <span class="badge bg-primary rounded-pill">4</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <label><input type="checkbox"> Software Product</label>
                                        <span class="badge bg-primary rounded-pill">5</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="headBx">Location</div>
                            <div class="listBx p0">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <label><input type="checkbox"> Kolkata</label>
                                        <span class="badge bg-primary rounded-pill">185</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <label><input type="checkbox"> Howrah</label>
                                        <span class="badge bg-primary rounded-pill">22</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <label><input type="checkbox"> Mumbai</label>
                                        <span class="badge bg-primary rounded-pill">13</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <label><input type="checkbox"> Delhi / NCR</label>
                                        <span class="badge bg-primary rounded-pill">320</span>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </nav>
            </div>
            <!-- left part end -->

            <!-- right part start -->
            <div class="col-md-8">
                <div class="row">
                    <!-- jobe item start -->
                    <div class="col-md-6">
                        <a class="jobeItem" href="jobs-details.php">
                            <div class="card mb20">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-9 col-sm-12">
                                            <h5>Website Designer</h5>
                                            <ul class="reviewList">
                                                <li><b>G Tech Web Solutions</b></li>
                                                <li><i class="fa fa-star"></i> <span>1.2</span></li>
                                                <li class="text-muted">|</li>
                                                <li><span>12 Reviews</li>
                                            </ul>
                                        </div>
                                        <div class="col-md-3 col-sm-12 logoBx">
                                            <img src="assets/images/g-logo.png" width="44" class="mt5" alt="" />
                                        </div>
                                    </div>
                                    <ul class="list-inline divider mb5">
                                        <li><i class="fa fa-briefcase"></i> 2-6 Yrs</li>
                                        <li><i class="fa fa-inr"></i> Not disclosed</li>
                                        <li><i class="fa fa-map-marker"></i> Kolkata</li>
                                    </ul>
                                    <p class="m0"><i class="fa fa-file-text-o"></i> Opening in our company for experienced Website Designer having good knowledge and exper...</p>
                                    <ul class="list-inline keySkl mb10">
                                        <li>html5</li>
                                        <li>Wordpress</li>
                                        <li>bootstrap</li>
                                        <li>Photoshop</li>
                                        <li>CSS3</li>
                                        <li>web designing</li>
                                    </ul>
                                    <div class="row footBx">
                                        <div class="col"><span class="text-muted">30+ Days Ago</span></div>
                                        <div class="col text14" align="right"><i class="fa fa-bookmark-o"></i> Save</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <!-- jobe item end -->
                    <!-- jobe item start -->
                    <div class="col-md-6">
                        <a class="jobeItem" href="jobs-details.php">
                            <div class="card mb20">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-9 col-sm-12">
                                            <h5>Website Designer</h5>
                                            <ul class="reviewList">
                                                <li><b>G Tech Web Solutions</b></li>
                                                <li><i class="fa fa-star"></i> <span>1.2</span></li>
                                                <li class="text-muted">|</li>
                                                <li><span>12 Reviews</li>
                                            </ul>
                                        </div>
                                        <div class="col-md-3 col-sm-12 logoBx">
                                            <img src="assets/images/g-logo.png" width="44" class="mt5" alt="" />
                                        </div>
                                    </div>
                                    <ul class="list-inline divider mb5">
                                        <li><i class="fa fa-briefcase"></i> 2-6 Yrs</li>
                                        <li><i class="fa fa-inr"></i> Not disclosed</li>
                                        <li><i class="fa fa-map-marker"></i> Kolkata</li>
                                    </ul>
                                    <p class="m0"><i class="fa fa-file-text-o"></i> Opening in our company for experienced Website Designer having good knowledge and exper...</p>
                                    <ul class="list-inline keySkl mb10">
                                        <li>html5</li>
                                        <li>Wordpress</li>
                                        <li>bootstrap</li>
                                        <li>Photoshop</li>
                                        <li>CSS3</li>
                                        <li>web designing</li>
                                    </ul>
                                    <div class="row footBx">
                                        <div class="col"><span class="text-muted">30+ Days Ago</span></div>
                                        <div class="col text14" align="right"><i class="fa fa-bookmark-o"></i> Save</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <!-- jobe item end -->
                    <!-- jobe item start -->
                    <div class="col-md-6">
                        <a class="jobeItem" href="jobs-details.php">
                            <div class="card mb20">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-9 col-sm-12">
                                            <h5>Website Designer</h5>
                                            <ul class="reviewList">
                                                <li><b>G Tech Web Solutions</b></li>
                                                <li><i class="fa fa-star"></i> <span>1.2</span></li>
                                                <li class="text-muted">|</li>
                                                <li><span>12 Reviews</li>
                                            </ul>
                                        </div>
                                        <div class="col-md-3 col-sm-12 logoBx">
                                            <img src="assets/images/g-logo.png" width="44" class="mt5" alt="" />
                                        </div>
                                    </div>
                                    <ul class="list-inline divider mb5">
                                        <li><i class="fa fa-briefcase"></i> 2-6 Yrs</li>
                                        <li><i class="fa fa-inr"></i> Not disclosed</li>
                                        <li><i class="fa fa-map-marker"></i> Kolkata</li>
                                    </ul>
                                    <p class="m0"><i class="fa fa-file-text-o"></i> Opening in our company for experienced Website Designer having good knowledge and exper...</p>
                                    <ul class="list-inline keySkl mb10">
                                        <li>html5</li>
                                        <li>Wordpress</li>
                                        <li>bootstrap</li>
                                        <li>Photoshop</li>
                                        <li>CSS3</li>
                                        <li>web designing</li>
                                    </ul>
                                    <div class="row footBx">
                                        <div class="col"><span class="text-muted">30+ Days Ago</span></div>
                                        <div class="col text14" align="right"><i class="fa fa-bookmark-o"></i> Save</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <!-- jobe item end -->
                    <!-- jobe item start -->
                    <div class="col-md-6">
                        <a class="jobeItem" href="jobs-details.php">
                            <div class="card mb20">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-9 col-sm-12">
                                            <h5>Website Designer</h5>
                                            <ul class="reviewList">
                                                <li><b>G Tech Web Solutions</b></li>
                                                <li><i class="fa fa-star"></i> <span>1.2</span></li>
                                                <li class="text-muted">|</li>
                                                <li><span>12 Reviews</li>
                                            </ul>
                                        </div>
                                        <div class="col-md-3 col-sm-12 logoBx">
                                            <img src="assets/images/g-logo.png" width="44" class="mt5" alt="" />
                                        </div>
                                    </div>
                                    <ul class="list-inline divider mb5">
                                        <li><i class="fa fa-briefcase"></i> 2-6 Yrs</li>
                                        <li><i class="fa fa-inr"></i> Not disclosed</li>
                                        <li><i class="fa fa-map-marker"></i> Kolkata</li>
                                    </ul>
                                    <p class="m0"><i class="fa fa-file-text-o"></i> Opening in our company for experienced Website Designer having good knowledge and exper...</p>
                                    <ul class="list-inline keySkl mb10">
                                        <li>html5</li>
                                        <li>Wordpress</li>
                                        <li>bootstrap</li>
                                        <li>Photoshop</li>
                                        <li>CSS3</li>
                                        <li>web designing</li>
                                    </ul>
                                    <div class="row footBx">
                                        <div class="col"><span class="text-muted">30+ Days Ago</span></div>
                                        <div class="col text14" align="right"><i class="fa fa-bookmark-o"></i> Save</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <!-- jobe item end -->
                    <!-- jobe item start -->
                    <div class="col-md-6">
                        <a class="jobeItem" href="jobs-details.php">
                            <div class="card mb20">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-9 col-sm-12">
                                            <h5>Website Designer</h5>
                                            <ul class="reviewList">
                                                <li><b>G Tech Web Solutions</b></li>
                                                <li><i class="fa fa-star"></i> <span>1.2</span></li>
                                                <li class="text-muted">|</li>
                                                <li><span>12 Reviews</li>
                                            </ul>
                                        </div>
                                        <div class="col-md-3 col-sm-12 logoBx">
                                            <img src="assets/images/g-logo.png" width="44" class="mt5" alt="" />
                                        </div>
                                    </div>
                                    <ul class="list-inline divider mb5">
                                        <li><i class="fa fa-briefcase"></i> 2-6 Yrs</li>
                                        <li><i class="fa fa-inr"></i> Not disclosed</li>
                                        <li><i class="fa fa-map-marker"></i> Kolkata</li>
                                    </ul>
                                    <p class="m0"><i class="fa fa-file-text-o"></i> Opening in our company for experienced Website Designer having good knowledge and exper...</p>
                                    <ul class="list-inline keySkl mb10">
                                        <li>html5</li>
                                        <li>Wordpress</li>
                                        <li>bootstrap</li>
                                        <li>Photoshop</li>
                                        <li>CSS3</li>
                                        <li>web designing</li>
                                    </ul>
                                    <div class="row footBx">
                                        <div class="col"><span class="text-muted">30+ Days Ago</span></div>
                                        <div class="col text14" align="right"><i class="fa fa-bookmark-o"></i> Save</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <!-- jobe item end -->
                    <!-- jobe item start -->
                    <div class="col-md-6">
                        <a class="jobeItem" href="jobs-details.php">
                            <div class="card mb20">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-9 col-sm-12">
                                            <h5>Website Designer</h5>
                                            <ul class="reviewList">
                                                <li><b>G Tech Web Solutions</b></li>
                                                <li><i class="fa fa-star"></i> <span>1.2</span></li>
                                                <li class="text-muted">|</li>
                                                <li><span>12 Reviews</li>
                                            </ul>
                                        </div>
                                        <div class="col-md-3 col-sm-12 logoBx">
                                            <img src="assets/images/g-logo.png" width="44" class="mt5" alt="" />
                                        </div>
                                    </div>
                                    <ul class="list-inline divider mb5">
                                        <li><i class="fa fa-briefcase"></i> 2-6 Yrs</li>
                                        <li><i class="fa fa-inr"></i> Not disclosed</li>
                                        <li><i class="fa fa-map-marker"></i> Kolkata</li>
                                    </ul>
                                    <p class="m0"><i class="fa fa-file-text-o"></i> Opening in our company for experienced Website Designer having good knowledge and exper...</p>
                                    <ul class="list-inline keySkl mb10">
                                        <li>html5</li>
                                        <li>Wordpress</li>
                                        <li>bootstrap</li>
                                        <li>Photoshop</li>
                                        <li>CSS3</li>
                                        <li>web designing</li>
                                    </ul>
                                    <div class="row footBx">
                                        <div class="col"><span class="text-muted">30+ Days Ago</span></div>
                                        <div class="col text14" align="right"><i class="fa fa-bookmark-o"></i> Save</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <!-- jobe item end -->
                    <!-- jobe item start -->
                    <div class="col-md-6">
                        <a class="jobeItem" href="jobs-details.php">
                            <div class="card mb20">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-9 col-sm-12">
                                            <h5>Website Designer</h5>
                                            <ul class="reviewList">
                                                <li><b>G Tech Web Solutions</b></li>
                                                <li><i class="fa fa-star"></i> <span>1.2</span></li>
                                                <li class="text-muted">|</li>
                                                <li><span>12 Reviews</li>
                                            </ul>
                                        </div>
                                        <div class="col-md-3 col-sm-12 logoBx">
                                            <img src="assets/images/g-logo.png" width="44" class="mt5" alt="" />
                                        </div>
                                    </div>
                                    <ul class="list-inline divider mb5">
                                        <li><i class="fa fa-briefcase"></i> 2-6 Yrs</li>
                                        <li><i class="fa fa-inr"></i> Not disclosed</li>
                                        <li><i class="fa fa-map-marker"></i> Kolkata</li>
                                    </ul>
                                    <p class="m0"><i class="fa fa-file-text-o"></i> Opening in our company for experienced Website Designer having good knowledge and exper...</p>
                                    <ul class="list-inline keySkl mb10">
                                        <li>html5</li>
                                        <li>Wordpress</li>
                                        <li>bootstrap</li>
                                        <li>Photoshop</li>
                                        <li>CSS3</li>
                                        <li>web designing</li>
                                    </ul>
                                    <div class="row footBx">
                                        <div class="col"><span class="text-muted">30+ Days Ago</span></div>
                                        <div class="col text14" align="right"><i class="fa fa-bookmark-o"></i> Save</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <!-- jobe item end -->
                    <!-- jobe item start -->
                    <div class="col-md-6">
                        <a class="jobeItem" href="jobs-details.php">
                            <div class="card mb20">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-9 col-sm-12">
                                            <h5>Website Designer</h5>
                                            <ul class="reviewList">
                                                <li><b>G Tech Web Solutions</b></li>
                                                <li><i class="fa fa-star"></i> <span>1.2</span></li>
                                                <li class="text-muted">|</li>
                                                <li><span>12 Reviews</li>
                                            </ul>
                                        </div>
                                        <div class="col-md-3 col-sm-12 logoBx">
                                            <img src="assets/images/g-logo.png" width="44" class="mt5" alt="" />
                                        </div>
                                    </div>
                                    <ul class="list-inline divider mb5">
                                        <li><i class="fa fa-briefcase"></i> 2-6 Yrs</li>
                                        <li><i class="fa fa-inr"></i> Not disclosed</li>
                                        <li><i class="fa fa-map-marker"></i> Kolkata</li>
                                    </ul>
                                    <p class="m0"><i class="fa fa-file-text-o"></i> Opening in our company for experienced Website Designer having good knowledge and exper...</p>
                                    <ul class="list-inline keySkl mb10">
                                        <li>html5</li>
                                        <li>Wordpress</li>
                                        <li>bootstrap</li>
                                        <li>Photoshop</li>
                                        <li>CSS3</li>
                                        <li>web designing</li>
                                    </ul>
                                    <div class="row footBx">
                                        <div class="col"><span class="text-muted">30+ Days Ago</span></div>
                                        <div class="col text14" align="right"><i class="fa fa-bookmark-o"></i> Save</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <!-- jobe item end -->
                    <!-- jobe item start -->
                    <div class="col-md-6">
                        <a class="jobeItem" href="jobs-details.php">
                            <div class="card mb20">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-9 col-sm-12">
                                            <h5>Website Designer</h5>
                                            <ul class="reviewList">
                                                <li><b>G Tech Web Solutions</b></li>
                                                <li><i class="fa fa-star"></i> <span>1.2</span></li>
                                                <li class="text-muted">|</li>
                                                <li><span>12 Reviews</li>
                                            </ul>
                                        </div>
                                        <div class="col-md-3 col-sm-12 logoBx">
                                            <img src="assets/images/g-logo.png" width="44" class="mt5" alt="" />
                                        </div>
                                    </div>
                                    <ul class="list-inline divider mb5">
                                        <li><i class="fa fa-briefcase"></i> 2-6 Yrs</li>
                                        <li><i class="fa fa-inr"></i> Not disclosed</li>
                                        <li><i class="fa fa-map-marker"></i> Kolkata</li>
                                    </ul>
                                    <p class="m0"><i class="fa fa-file-text-o"></i> Opening in our company for experienced Website Designer having good knowledge and exper...</p>
                                    <ul class="list-inline keySkl mb10">
                                        <li>html5</li>
                                        <li>Wordpress</li>
                                        <li>bootstrap</li>
                                        <li>Photoshop</li>
                                        <li>CSS3</li>
                                        <li>web designing</li>
                                    </ul>
                                    <div class="row footBx">
                                        <div class="col"><span class="text-muted">30+ Days Ago</span></div>
                                        <div class="col text14" align="right"><i class="fa fa-bookmark-o"></i> Save</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <!-- jobe item end -->
                    <!-- jobe item start -->
                    <div class="col-md-6">
                        <a class="jobeItem" href="jobs-details.php">
                            <div class="card mb20">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-9 col-sm-12">
                                            <h5>Website Designer</h5>
                                            <ul class="reviewList">
                                                <li><b>G Tech Web Solutions</b></li>
                                                <li><i class="fa fa-star"></i> <span>1.2</span></li>
                                                <li class="text-muted">|</li>
                                                <li><span>12 Reviews</li>
                                            </ul>
                                        </div>
                                        <div class="col-md-3 col-sm-12 logoBx">
                                            <img src="assets/images/g-logo.png" width="44" class="mt5" alt="" />
                                        </div>
                                    </div>
                                    <ul class="list-inline divider mb5">
                                        <li><i class="fa fa-briefcase"></i> 2-6 Yrs</li>
                                        <li><i class="fa fa-inr"></i> Not disclosed</li>
                                        <li><i class="fa fa-map-marker"></i> Kolkata</li>
                                    </ul>
                                    <p class="m0"><i class="fa fa-file-text-o"></i> Opening in our company for experienced Website Designer having good knowledge and exper...</p>
                                    <ul class="list-inline keySkl mb10">
                                        <li>html5</li>
                                        <li>Wordpress</li>
                                        <li>bootstrap</li>
                                        <li>Photoshop</li>
                                        <li>CSS3</li>
                                        <li>web designing</li>
                                    </ul>
                                    <div class="row footBx">
                                        <div class="col"><span class="text-muted">30+ Days Ago</span></div>
                                        <div class="col text14" align="right"><i class="fa fa-bookmark-o"></i> Save</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <!-- jobe item end -->
                    <!-- jobe item start -->
                    <div class="col-md-6">
                        <a class="jobeItem" href="jobs-details.php">
                            <div class="card mb20">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-9 col-sm-12">
                                            <h5>Website Designer</h5>
                                            <ul class="reviewList">
                                                <li><b>G Tech Web Solutions</b></li>
                                                <li><i class="fa fa-star"></i> <span>1.2</span></li>
                                                <li class="text-muted">|</li>
                                                <li><span>12 Reviews</li>
                                            </ul>
                                        </div>
                                        <div class="col-md-3 col-sm-12 logoBx">
                                            <img src="assets/images/g-logo.png" width="44" class="mt5" alt="" />
                                        </div>
                                    </div>
                                    <ul class="list-inline divider mb5">
                                        <li><i class="fa fa-briefcase"></i> 2-6 Yrs</li>
                                        <li><i class="fa fa-inr"></i> Not disclosed</li>
                                        <li><i class="fa fa-map-marker"></i> Kolkata</li>
                                    </ul>
                                    <p class="m0"><i class="fa fa-file-text-o"></i> Opening in our company for experienced Website Designer having good knowledge and exper...</p>
                                    <ul class="list-inline keySkl mb10">
                                        <li>html5</li>
                                        <li>Wordpress</li>
                                        <li>bootstrap</li>
                                        <li>Photoshop</li>
                                        <li>CSS3</li>
                                        <li>web designing</li>
                                    </ul>
                                    <div class="row footBx">
                                        <div class="col"><span class="text-muted">30+ Days Ago</span></div>
                                        <div class="col text14" align="right"><i class="fa fa-bookmark-o"></i> Save</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <!-- jobe item end -->
                    <!-- jobe item start -->
                    <div class="col-md-6">
                        <a class="jobeItem" href="jobs-details.php">
                            <div class="card mb20">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-9 col-sm-12">
                                            <h5>Website Designer</h5>
                                            <ul class="reviewList">
                                                <li><b>G Tech Web Solutions</b></li>
                                                <li><i class="fa fa-star"></i> <span>1.2</span></li>
                                                <li class="text-muted">|</li>
                                                <li><span>12 Reviews</li>
                                            </ul>
                                        </div>
                                        <div class="col-md-3 col-sm-12 logoBx">
                                            <img src="assets/images/g-logo.png" width="44" class="mt5" alt="" />
                                        </div>
                                    </div>
                                    <ul class="list-inline divider mb5">
                                        <li><i class="fa fa-briefcase"></i> 2-6 Yrs</li>
                                        <li><i class="fa fa-inr"></i> Not disclosed</li>
                                        <li><i class="fa fa-map-marker"></i> Kolkata</li>
                                    </ul>
                                    <p class="m0"><i class="fa fa-file-text-o"></i> Opening in our company for experienced Website Designer having good knowledge and exper...</p>
                                    <ul class="list-inline keySkl mb10">
                                        <li>html5</li>
                                        <li>Wordpress</li>
                                        <li>bootstrap</li>
                                        <li>Photoshop</li>
                                        <li>CSS3</li>
                                        <li>web designing</li>
                                    </ul>
                                    <div class="row footBx">
                                        <div class="col"><span class="text-muted">30+ Days Ago</span></div>
                                        <div class="col text14" align="right"><i class="fa fa-bookmark-o"></i> Save</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <!-- jobe item end -->
                    <!-- jobe item start -->
                    <div class="col-md-6">
                        <a class="jobeItem" href="jobs-details.php">
                            <div class="card mb20">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-9 col-sm-12">
                                            <h5>Website Designer</h5>
                                            <ul class="reviewList">
                                                <li><b>G Tech Web Solutions</b></li>
                                                <li><i class="fa fa-star"></i> <span>1.2</span></li>
                                                <li class="text-muted">|</li>
                                                <li><span>12 Reviews</li>
                                            </ul>
                                        </div>
                                        <div class="col-md-3 col-sm-12 logoBx">
                                            <img src="assets/images/g-logo.png" width="44" class="mt5" alt="" />
                                        </div>
                                    </div>
                                    <ul class="list-inline divider mb5">
                                        <li><i class="fa fa-briefcase"></i> 2-6 Yrs</li>
                                        <li><i class="fa fa-inr"></i> Not disclosed</li>
                                        <li><i class="fa fa-map-marker"></i> Kolkata</li>
                                    </ul>
                                    <p class="m0"><i class="fa fa-file-text-o"></i> Opening in our company for experienced Website Designer having good knowledge and exper...</p>
                                    <ul class="list-inline keySkl mb10">
                                        <li>html5</li>
                                        <li>Wordpress</li>
                                        <li>bootstrap</li>
                                        <li>Photoshop</li>
                                        <li>CSS3</li>
                                        <li>web designing</li>
                                    </ul>
                                    <div class="row footBx">
                                        <div class="col"><span class="text-muted">30+ Days Ago</span></div>
                                        <div class="col text14" align="right"><i class="fa fa-bookmark-o"></i> Save</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <!-- jobe item end -->
                    <!-- jobe item start -->
                    <div class="col-md-6">
                        <a class="jobeItem" href="jobs-details.php">
                            <div class="card mb20">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-9 col-sm-12">
                                            <h5>Website Designer</h5>
                                            <ul class="reviewList">
                                                <li><b>G Tech Web Solutions</b></li>
                                                <li><i class="fa fa-star"></i> <span>1.2</span></li>
                                                <li class="text-muted">|</li>
                                                <li><span>12 Reviews</li>
                                            </ul>
                                        </div>
                                        <div class="col-md-3 col-sm-12 logoBx">
                                            <img src="assets/images/g-logo.png" width="44" class="mt5" alt="" />
                                        </div>
                                    </div>
                                    <ul class="list-inline divider mb5">
                                        <li><i class="fa fa-briefcase"></i> 2-6 Yrs</li>
                                        <li><i class="fa fa-inr"></i> Not disclosed</li>
                                        <li><i class="fa fa-map-marker"></i> Kolkata</li>
                                    </ul>
                                    <p class="m0"><i class="fa fa-file-text-o"></i> Opening in our company for experienced Website Designer having good knowledge and exper...</p>
                                    <ul class="list-inline keySkl mb10">
                                        <li>html5</li>
                                        <li>Wordpress</li>
                                        <li>bootstrap</li>
                                        <li>Photoshop</li>
                                        <li>CSS3</li>
                                        <li>web designing</li>
                                    </ul>
                                    <div class="row footBx">
                                        <div class="col"><span class="text-muted">30+ Days Ago</span></div>
                                        <div class="col text14" align="right"><i class="fa fa-bookmark-o"></i> Save</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <!-- jobe item end -->
                    <!-- jobe item start -->
                    <div class="col-md-6">
                        <a class="jobeItem" href="jobs-details.php">
                            <div class="card mb20">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-9 col-sm-12">
                                            <h5>Website Designer</h5>
                                            <ul class="reviewList">
                                                <li><b>G Tech Web Solutions</b></li>
                                                <li><i class="fa fa-star"></i> <span>1.2</span></li>
                                                <li class="text-muted">|</li>
                                                <li><span>12 Reviews</li>
                                            </ul>
                                        </div>
                                        <div class="col-md-3 col-sm-12 logoBx">
                                            <img src="assets/images/g-logo.png" width="44" class="mt5" alt="" />
                                        </div>
                                    </div>
                                    <ul class="list-inline divider mb5">
                                        <li><i class="fa fa-briefcase"></i> 2-6 Yrs</li>
                                        <li><i class="fa fa-inr"></i> Not disclosed</li>
                                        <li><i class="fa fa-map-marker"></i> Kolkata</li>
                                    </ul>
                                    <p class="m0"><i class="fa fa-file-text-o"></i> Opening in our company for experienced Website Designer having good knowledge and exper...</p>
                                    <ul class="list-inline keySkl mb10">
                                        <li>html5</li>
                                        <li>Wordpress</li>
                                        <li>bootstrap</li>
                                        <li>Photoshop</li>
                                        <li>CSS3</li>
                                        <li>web designing</li>
                                    </ul>
                                    <div class="row footBx">
                                        <div class="col"><span class="text-muted">30+ Days Ago</span></div>
                                        <div class="col text14" align="right"><i class="fa fa-bookmark-o"></i> Save</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <!-- jobe item end -->
                    <!-- jobe item start -->
                    <div class="col-md-6">
                        <a class="jobeItem" href="jobs-details.php">
                            <div class="card mb20">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-9 col-sm-12">
                                            <h5>Website Designer</h5>
                                            <ul class="reviewList">
                                                <li><b>G Tech Web Solutions</b></li>
                                                <li><i class="fa fa-star"></i> <span>1.2</span></li>
                                                <li class="text-muted">|</li>
                                                <li><span>12 Reviews</li>
                                            </ul>
                                        </div>
                                        <div class="col-md-3 col-sm-12 logoBx">
                                            <img src="assets/images/g-logo.png" width="44" class="mt5" alt="" />
                                        </div>
                                    </div>
                                    <ul class="list-inline divider mb5">
                                        <li><i class="fa fa-briefcase"></i> 2-6 Yrs</li>
                                        <li><i class="fa fa-inr"></i> Not disclosed</li>
                                        <li><i class="fa fa-map-marker"></i> Kolkata</li>
                                    </ul>
                                    <p class="m0"><i class="fa fa-file-text-o"></i> Opening in our company for experienced Website Designer having good knowledge and exper...</p>
                                    <ul class="list-inline keySkl mb10">
                                        <li>html5</li>
                                        <li>Wordpress</li>
                                        <li>bootstrap</li>
                                        <li>Photoshop</li>
                                        <li>CSS3</li>
                                        <li>web designing</li>
                                    </ul>
                                    <div class="row footBx">
                                        <div class="col"><span class="text-muted">30+ Days Ago</span></div>
                                        <div class="col text14" align="right"><i class="fa fa-bookmark-o"></i> Save</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <!-- jobe item end -->
                </div>
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