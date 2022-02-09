export enum HttpElement {
	Body = 1,
	Query
}

export enum HttpStatus {
	Accepted = 202,
	BadGateway = 502,
	BadRequest = 400,
	Conflict = 409,
	Continue = 100,
	Created = 201,
	ExpectationFailed = 417,
	FailedDependency = 424,
	Forbidden = 403,
	GatewayTimeout = 504,
	Gone = 410,
	HttpVersionNotSupported = 505,
	ImATeapot = 418,
	InsufficientSpaceOnResource = 419,
	InsufficientStorage = 507,
	InternalServerError = 500,
	LengthRequired = 411,
	Locked = 423,
	MethodFailure = 420,
	MethodNotAllowed = 405,
	MovedPermanently = 301,
	MovedTemporarily = 302,
	MultiStatus = 207,
	MultipleChoices = 300,
	NetworkAuthenticationRequired = 511,
	NoContent = 204,
	NonAuthoritativeInformation = 203,
	NotAcceptable = 406,
	NotFound = 404,
	NotImplemented = 501,
	NotModified = 304,
	Ok = 200,
	PartialContent = 206,
	PaymentRequired = 402,
	PermanentRedirect = 308,
	PreconditionFailed = 412,
	PreconditionRequired = 428,
	Processing = 102,
	ProxyAuthenticationRequired = 407,
	RequestHeaderFieldsTooLarge = 431,
	RequestTimeout = 408,
	RequestTooLong = 413,
	RequestUriTooLong = 414,
	RequestedRangeNotSatisfiable = 416,
	ResetContent = 205,
	SeeOther = 303,
	ServiceUnavailable = 503,
	SwitchingProtocols = 101,
	TemporaryRedirect = 307,
	TooManyRequests = 429,
	Unauthorized = 401,
	UnavailableForLegalReasons = 451,
	UnprocessableEntity = 422,
	UnsupportedMediaType = 415,
	UseProxy = 305,
}
