<?php include 'header.php'; ?>

<!-- page header part start here -->
<section class="pageBanner">
    <article class="container">
        <aside class="row">
            <div class="col-md-6">
                <h4>Fashion & Beauty</h4>
            </div>
            <div class="col-md-6">
                <ul class="navList">
                    <li><a href="index.php">Home</a></li>
                    <li><a href="javascript:void(0)">Category</a></li>
                    <li class="active">Fashion & Beauty</li>
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
                            
                            <div class="headBx">Gender</div>
                            <div class="listBx p0">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <div class="form-check">
                                          <input class="form-check-input" type="radio" name="gender" id="gender1">
                                          <label class="form-check-label" for="gender1">
                                            Men
                                          </label>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                    <div class="form-check">
                                      <input class="form-check-input" type="radio" name="gender" id="gender2" checked>
                                      <label class="form-check-label" for="gender2">
                                        Women
                                      </label>
                                    </div>
                                    </li>
                                </ul>
                            </div>
                           <div class="headBx dropHeadBx"><a class="collapseLink" data-bs-toggle="collapse" href="#category">Category <i class="fa fa-chevron-circle-down pull-right mt3"></i></a></div>
                            <div class="listBx p0 collapse show" id="category">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Westernwear
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Indianwear
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Jewellery
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Bags
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Lingerie
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Accessories
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Footwear
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Active & Sports
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Sportswear
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Maternity Wear
                                        </label>
                                    </li>
                                </ul>
                            </div>
                            <div class="headBx dropHeadBx"><a class="collapseLink" data-bs-toggle="collapse" href="#occasion">Occasion <i class="fa fa-chevron-circle-down pull-right mt3"></i></a></div>
                            <div class="listBx p0 collapse show" id="occasion">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Casual
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Festive
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Party
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Everyday Essentials
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Wedding
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Evening
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Work
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Sports
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Winter
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Formal
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Fusion
                                        </label>
                                    </li>
                                </ul>
                            </div>
                            <div class="headBx dropHeadBx"><a class="collapseLink" data-bs-toggle="collapse" href="#colorBx">Color <i class="fa fa-chevron-circle-down pull-right mt3"></i></a></div>
                            <div class="listBx p0 collapse show colorBx" id="colorBx">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> <span style="background-color:#f00;"></span> Red
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> <span style="background-color:#000;"></span> Black
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> <span style="background-color:#00a903;"></span> Green
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> <span style="background-color:#e7bd42;"></span> Gold
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> <span style="background-color:#663300;"></span> Brown
                                        </label>
                                    </li>
                                </ul>
                            </div>
                            <div class="headBx">Price</div>
                            <div class="listBx">
                                <input type="range" value="200" min="0" max="1000" class="width100 mt10 mb10">
                            </div>
                            
                            <div class="headBx dropHeadBx"><a class="collapseLink" data-bs-toggle="collapse" href="#material">Material <i class="fa fa-chevron-circle-down pull-right mt3"></i></a></div>
                            <div class="listBx p0 collapse show" id="material">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Cotton
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Polyester
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Brass
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Blended Fabric
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Alloy
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Viscose
                                        </label>
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
                    <!-- item start -->
                    <div class="col-md-3">
                        <div class="card shopItem">
                            <div class="card-body">
                                <div class="proImg">
                                    <a href="fashion-beauty-details.php"><img src="assets/images/fb-1.webp" alt="" /></a>
                                    <a class="wishList" href="javascript:void(0)"><i class="fa fa-heart-o"></i></a>
                                </div>
                                <div class="textCont">
                                    <h4><a href="javascript:void(0)">Tikhi Imli</a></h4>
                                    <p>Mustard Embroidered Kurta With Embroidered Net Dupatta (Set of 3)</p>
                                    <div class="priceBx">
                                        <h6 class="mb5"><b>₹1,695</b> <span class="text-success">47% Off</span></h6>
                                        <h6 class="mb0 text14"><s class="text-danger">MRP₹3,198</s></h6>
                                    </div>
                                    <a class="btn btnTheme btn-sm width100" href="fashion-beauty-details.php"><b>View Details</b></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- item end -->
                    <!-- item start -->
                    <div class="col-md-3">
                        <div class="card shopItem">
                            <div class="card-body">
                                <div class="proImg">
                                    <a href="fashion-beauty-details.php"><img src="assets/images/fb-2.webp" alt="" /></a>
                                    <a class="wishList" href="javascript:void(0)"><i class="fa fa-heart-o"></i></a>
                                </div>
                                <div class="textCont">
                                    <h4><a href="javascript:void(0)">Tikhi Imli</a></h4>
                                    <p>Mustard Embroidered Kurta With Embroidered Net Dupatta (Set of 3)</p>
                                    <div class="priceBx">
                                        <h6 class="mb5"><b>₹1,695</b> <span class="text-success">47% Off</span></h6>
                                        <h6 class="mb0 text14"><s class="text-danger">MRP₹3,198</s></h6>
                                    </div>
                                    <a class="btn btnTheme btn-sm width100" href="fashion-beauty-details.php"><b>View Details</b></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- item end -->
                    <!-- item start -->
                    <div class="col-md-3">
                        <div class="card shopItem">
                            <div class="card-body">
                                <div class="proImg">
                                    <a href="fashion-beauty-details.php"><img src="assets/images/fb-3.webp" alt="" /></a>
                                    <a class="wishList" href="javascript:void(0)"><i class="fa fa-heart-o"></i></a>
                                </div>
                                <div class="textCont">
                                    <h4><a href="javascript:void(0)">Tikhi Imli</a></h4>
                                    <p>Mustard Embroidered Kurta With Embroidered Net Dupatta (Set of 3)</p>
                                    <div class="priceBx">
                                        <h6 class="mb5"><b>₹1,695</b> <span class="text-success">47% Off</span></h6>
                                        <h6 class="mb0 text14"><s class="text-danger">MRP₹3,198</s></h6>
                                    </div>
                                    <a class="btn btnTheme btn-sm width100" href="fashion-beauty-details.php"><b>View Details</b></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- item end -->
                    <!-- item start -->
                    <div class="col-md-3">
                        <div class="card shopItem">
                            <div class="card-body">
                                <div class="proImg">
                                    <a href="fashion-beauty-details.php"><img src="assets/images/fb-4.webp" alt="" /></a>
                                    <a class="wishList" href="javascript:void(0)"><i class="fa fa-heart-o"></i></a>
                                </div>
                                <div class="textCont">
                                    <h4><a href="javascript:void(0)">Tikhi Imli</a></h4>
                                    <p>Mustard Embroidered Kurta With Embroidered Net Dupatta (Set of 3)</p>
                                    <div class="priceBx">
                                        <h6 class="mb5"><b>₹1,695</b> <span class="text-success">47% Off</span></h6>
                                        <h6 class="mb0 text14"><s class="text-danger">MRP₹3,198</s></h6>
                                    </div>
                                    <a class="btn btnTheme btn-sm width100" href="fashion-beauty-details.php"><b>View Details</b></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- item end -->
                    <!-- item start -->
                    <div class="col-md-3">
                        <div class="card shopItem">
                            <div class="card-body">
                                <div class="proImg">
                                    <a href="fashion-beauty-details.php"><img src="assets/images/fb-5.webp" alt="" /></a>
                                    <a class="wishList" href="javascript:void(0)"><i class="fa fa-heart-o"></i></a>
                                </div>
                                <div class="textCont">
                                    <h4><a href="javascript:void(0)">Tikhi Imli</a></h4>
                                    <p>Mustard Embroidered Kurta With Embroidered Net Dupatta (Set of 3)</p>
                                    <div class="priceBx">
                                        <h6 class="mb5"><b>₹1,695</b> <span class="text-success">47% Off</span></h6>
                                        <h6 class="mb0 text14"><s class="text-danger">MRP₹3,198</s></h6>
                                    </div>
                                    <a class="btn btnTheme btn-sm width100" href="fashion-beauty-details.php"><b>View Details</b></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- item end -->
                    <!-- item start -->
                    <div class="col-md-3">
                        <div class="card shopItem">
                            <div class="card-body">
                                <div class="proImg">
                                    <a href="fashion-beauty-details.php"><img src="assets/images/fb-6.webp" alt="" /></a>
                                    <a class="wishList" href="javascript:void(0)"><i class="fa fa-heart-o"></i></a>
                                </div>
                                <div class="textCont">
                                    <h4><a href="javascript:void(0)">Tikhi Imli</a></h4>
                                    <p>Mustard Embroidered Kurta With Embroidered Net Dupatta (Set of 3)</p>
                                    <div class="priceBx">
                                        <h6 class="mb5"><b>₹1,695</b> <span class="text-success">47% Off</span></h6>
                                        <h6 class="mb0 text14"><s class="text-danger">MRP₹3,198</s></h6>
                                    </div>
                                    <a class="btn btnTheme btn-sm width100" href="fashion-beauty-details.php"><b>View Details</b></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- item end -->
                    <!-- item start -->
                    <div class="col-md-3">
                        <div class="card shopItem">
                            <div class="card-body">
                                <div class="proImg">
                                    <a href="fashion-beauty-details.php"><img src="assets/images/fb-7.webp" alt="" /></a>
                                    <a class="wishList" href="javascript:void(0)"><i class="fa fa-heart-o"></i></a>
                                </div>
                                <div class="textCont">
                                    <h4><a href="javascript:void(0)">Tikhi Imli</a></h4>
                                    <p>Mustard Embroidered Kurta With Embroidered Net Dupatta (Set of 3)</p>
                                    <div class="priceBx">
                                        <h6 class="mb5"><b>₹1,695</b> <span class="text-success">47% Off</span></h6>
                                        <h6 class="mb0 text14"><s class="text-danger">MRP₹3,198</s></h6>
                                    </div>
                                    <a class="btn btnTheme btn-sm width100" href="fashion-beauty-details.php"><b>View Details</b></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- item end -->
                    <!-- item start -->
                    <div class="col-md-3">
                        <div class="card shopItem">
                            <div class="card-body">
                                <div class="proImg">
                                    <a href="fashion-beauty-details.php"><img src="assets/images/fb-8.webp" alt="" /></a>
                                    <a class="wishList" href="javascript:void(0)"><i class="fa fa-heart-o"></i></a>
                                </div>
                                <div class="textCont">
                                    <h4><a href="javascript:void(0)">Tikhi Imli</a></h4>
                                    <p>Mustard Embroidered Kurta With Embroidered Net Dupatta (Set of 3)</p>
                                    <div class="priceBx">
                                        <h6 class="mb5"><b>₹1,695</b> <span class="text-success">47% Off</span></h6>
                                        <h6 class="mb0 text14"><s class="text-danger">MRP₹3,198</s></h6>
                                    </div>
                                    <a class="btn btnTheme btn-sm width100" href="fashion-beauty-details.php"><b>View Details</b></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- item end -->
                    <!-- item start -->
                    <div class="col-md-3">
                        <div class="card shopItem">
                            <div class="card-body">
                                <div class="proImg">
                                    <a href="fashion-beauty-details.php"><img src="assets/images/fb-9.webp" alt="" /></a>
                                    <a class="wishList" href="javascript:void(0)"><i class="fa fa-heart-o"></i></a>
                                </div>
                                <div class="textCont">
                                    <h4><a href="javascript:void(0)">Tikhi Imli</a></h4>
                                    <p>Mustard Embroidered Kurta With Embroidered Net Dupatta (Set of 3)</p>
                                    <div class="priceBx">
                                        <h6 class="mb5"><b>₹1,695</b> <span class="text-success">47% Off</span></h6>
                                        <h6 class="mb0 text14"><s class="text-danger">MRP₹3,198</s></h6>
                                    </div>
                                    <a class="btn btnTheme btn-sm width100" href="fashion-beauty-details.php"><b>View Details</b></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- item end -->
                    <!-- item start -->
                    <div class="col-md-3">
                        <div class="card shopItem">
                            <div class="card-body">
                                <div class="proImg">
                                    <a href="fashion-beauty-details.php"><img src="assets/images/fb-10.webp" alt="" /></a>
                                    <a class="wishList" href="javascript:void(0)"><i class="fa fa-heart-o"></i></a>
                                </div>
                                <div class="textCont">
                                    <h4><a href="javascript:void(0)">Tikhi Imli</a></h4>
                                    <p>Mustard Embroidered Kurta With Embroidered Net Dupatta (Set of 3)</p>
                                    <div class="priceBx">
                                        <h6 class="mb5"><b>₹1,695</b> <span class="text-success">47% Off</span></h6>
                                        <h6 class="mb0 text14"><s class="text-danger">MRP₹3,198</s></h6>
                                    </div>
                                    <a class="btn btnTheme btn-sm width100" href="fashion-beauty-details.php"><b>View Details</b></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- item end -->
                    <!-- item start -->
                    <div class="col-md-3">
                        <div class="card shopItem">
                            <div class="card-body">
                                <div class="proImg">
                                    <a href="fashion-beauty-details.php"><img src="assets/images/fb-11.webp" alt="" /></a>
                                    <a class="wishList" href="javascript:void(0)"><i class="fa fa-heart-o"></i></a>
                                </div>
                                <div class="textCont">
                                    <h4><a href="javascript:void(0)">Tikhi Imli</a></h4>
                                    <p>Mustard Embroidered Kurta With Embroidered Net Dupatta (Set of 3)</p>
                                    <div class="priceBx">
                                        <h6 class="mb5"><b>₹1,695</b> <span class="text-success">47% Off</span></h6>
                                        <h6 class="mb0 text14"><s class="text-danger">MRP₹3,198</s></h6>
                                    </div>
                                    <a class="btn btnTheme btn-sm width100" href="fashion-beauty-details.php"><b>View Details</b></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- item end -->
                    <!-- item start -->
                    <div class="col-md-3">
                        <div class="card shopItem">
                            <div class="card-body">
                                <div class="proImg">
                                    <a href="fashion-beauty-details.php"><img src="assets/images/fb-12.webp" alt="" /></a>
                                    <a class="wishList" href="javascript:void(0)"><i class="fa fa-heart-o"></i></a>
                                </div>
                                <div class="textCont">
                                    <h4><a href="javascript:void(0)">Tikhi Imli</a></h4>
                                    <p>Mustard Embroidered Kurta With Embroidered Net Dupatta (Set of 3)</p>
                                    <div class="priceBx">
                                        <h6 class="mb5"><b>₹1,695</b> <span class="text-success">47% Off</span></h6>
                                        <h6 class="mb0 text14"><s class="text-danger">MRP₹3,198</s></h6>
                                    </div>
                                    <a class="btn btnTheme btn-sm width100" href="fashion-beauty-details.php"><b>View Details</b></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- item end -->
                </div>
                <!-- pagination work start -->
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
                <!-- pagination work end -->
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